import express from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import { encryptJSON, decryptJSON } from "../lib/crypto";
import { ioServer } from "../sockets/index";
import requireUser from "../middleware/auth";

const router = express.Router();

// create or get a conversation
router.post("/conversations", requireUser, async (req, res) => {
  const { participants } = req.body as { participants: string[] };
  if (!participants || !Array.isArray(participants) || participants.length < 2)
    return res
      .status(400)
      .json({ error: "participants must be an array of at least 2 user ids" });

  // try to find existing conversation with same participants (order-agnostic)
  const participantsSet = participants.slice().sort();
  let convo = await Conversation.findOne({
    participants: { $size: participants.length, $all: participants },
  });
  if (!convo) {
    convo = await Conversation.create({ participants });
  }
  res.json(convo);
});

// list conversations for current user
router.get("/conversations", requireUser, async (req, res) => {
  const uid = req.user!.id;
  const convos = await Conversation.find({ participants: uid })
    .sort({ lastAt: -1 })
    .lean();
  res.json(convos);
});

// post a message to a conversation
router.post("/messages", requireUser, async (req, res) => {
  const sender = req.user!.id;
  const { conversationId, content } = req.body as {
    conversationId: string;
    content: string;
  };
  if (!conversationId || !content)
    return res
      .status(400)
      .json({ error: "conversationId and content required" });

  // encrypt content (store as encrypted JSON to leverage existing utilities)
  const encrypted = encryptJSON({
    text: content,
    meta: { sentAt: new Date().toISOString() },
  });

  const msg = await Message.create({
    conversation: conversationId,
    sender,
    content: encrypted,
  });

  // update conversation preview
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: encrypted,
    lastAt: msg.createdAt,
  });

  // emit to DM namespace if sockets available
  try {
    if (ioServer) {
      ioServer.of(`/dm/${conversationId}`).emit("dm_message", {
        id: msg._id,
        conversation: conversationId,
        sender,
        content: encrypted,
        createdAt: msg.createdAt,
      });
    }
  } catch (e) {
    console.warn("emit failed", e);
  }

  res.json({
    id: msg._id,
    conversation: conversationId,
    sender,
    createdAt: msg.createdAt,
  });
});

// fetch messages for a conversation
router.get("/messages/:conversationId", requireUser, async (req, res) => {
  const { conversationId } = req.params;
  const msgs = await Message.find({ conversation: conversationId })
    .sort({ createdAt: 1 })
    .lean();
  // decrypt contents
  const out = msgs.map((m: any) => {
    let decrypted: any = null;
    try {
      decrypted = decryptJSON(m.content);
    } catch (e) {
      decrypted = { text: "[unable to decrypt]" };
    }
    return {
      id: m._id,
      conversation: m.conversation,
      sender: m.sender,
      text: decrypted?.text,
      createdAt: m.createdAt,
    };
  });
  res.json(out);
});

export default router;
