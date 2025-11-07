import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./sockets";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Telehealth backend is running ✅"));

// HTTP + Socket.io setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat_message", (msg) => io.emit("chat_message", msg));
});

// initialize namespaced/socket handlers
initSocket(io);

server.listen(process.env.PORT || 8080, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 8080}`);
  console.log("http://localhost:" + (process.env.PORT || 8080));
});
