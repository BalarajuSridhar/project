// backend/src/socket.js
import { Server as SocketIOServer } from 'socket.io';

export function registerSocketHandlers(server) {
  const io = new SocketIOServer(server, {
    cors: { origin: process.env.CORS_ORIGIN || 'http://localhost:3000', methods: ['GET','POST'], credentials: true },
  });

  io.on('connection', (socket) => {
    console.log('WS connected', socket.id);

    socket.on('ping', (data) => {
      socket.emit('pong', { time: new Date().toISOString(), you: data });
    });

    socket.on('disconnect', (reason) => {
      console.log('WS disconnect', socket.id, reason);
    });
  });

  return io;
}
