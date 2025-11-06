import { Server } from 'socket.io';

export function initSocket(io: Server) {
  io.of(/^\/room\/\w+$/).on('connection', (socket) => {
    const roomId = socket.nsp.name.split('/').pop();
    console.log(`User joined room ${roomId}`);

    socket.on('chat_message', (msg) => {
      io.of(`/room/${roomId}`).emit('chat_message', msg);
    });

    socket.on('transcript_segment', (seg) => {
      io.of(`/room/${roomId}`).emit('transcript_update', seg.text);
    });
  });
}
