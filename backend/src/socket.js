// backend/src/socket.js
import { Server } from 'socket.io';

export function registerSocketHandlers(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    socket.on('join-internship-room', (internshipId) => {
      socket.join(`internship-${internshipId}`);
      console.log(`Client ${socket.id} joined internship room ${internshipId}`);
    });

    socket.on('new-application', (data) => {
      // Broadcast to all clients in the internship room
      socket.to(`internship-${data.internshipId}`).emit('application-received', data);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id);
    });
  });

  return io;
}