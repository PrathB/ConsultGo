import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = io("http://localhost:8080");
    setSocket(s);
    s.on("chat_message", (m) => setMessages((prev) => [...prev, m]));
    return () => s.disconnect();
  }, []);

  const send = () => {
    socket.emit("chat_message", msg);
    setMsg("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Telehealth Chat Test 🩺</h2>
      <div
        style={{
          height: "200px",
          overflowY: "auto",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
