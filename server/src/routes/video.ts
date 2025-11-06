import express from "express";
import { createRoom } from "../lib/daily";

const router = express.Router();

// POST /api/video/room
router.post("/room", async (req, res) => {
  try {
    const room = await createRoom();
    res.json(room);
  } catch (err) {
    console.error("Error creating Daily room:", err);
    res.status(500).json({ error: "Could not create room" });
  }
});

export default router;
