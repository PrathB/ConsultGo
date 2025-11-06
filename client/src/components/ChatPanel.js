import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function ChatPanel({ appointmentId }) {
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = io(`/room/${appointmentId}`);
    setSocket(s);
    s.on("chat_message", (m) => setMessages((prev) => [...prev, m]));
    return () => s.disconnect();
  }, [appointmentId]);

  const send = () => {
    if (msg.trim()) {
      socket.emit("chat_message", msg);
      setMsg("");
    }
  };

  return (
    <div>
      <div style={{ height: "200px", overflowY: "auto" }}>
        {messages.map((m, i) => <p key={i}>{m}</p>)}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
