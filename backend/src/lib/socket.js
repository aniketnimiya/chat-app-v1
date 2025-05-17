import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map to store user IDs and their socket IDs
const userSocketMap = {};

// Function to get receiver's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId]?.socketId; // Return only the socketId
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Extract userId from the handshake query
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = { socketId: socket.id, isTyping: false };
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated user list
  }

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Find the userId associated with this socket
    const disconnectedUserId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key].socketId === socket.id
    );

    if (disconnectedUserId) {
      delete userSocketMap[disconnectedUserId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated user list
    }
  });
});

export { app, server, io };
