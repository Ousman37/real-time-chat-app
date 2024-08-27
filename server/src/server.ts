// server/server.ts
import http from "http";
import { Server, Socket } from "socket.io";
import app from "./app"; // Import the Express app
import Message from "./models/Message"; // Import the Message model

const PORT = process.env.PORT || 5001;

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Initialize a new instance of Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from your React app
    methods: ["GET", "POST"], // Allowed methods
    credentials: true, // Allow cookies to be sent if necessary
  },
});

// Handle a new socket connection
io.on("connection", async (socket: Socket) => {
  console.log(`A user connected: ${socket.id}`);

  try {
    // Retrieve the last 50 messages from the database and send them to the connected user
    const messages = await Message.find().sort({ createdAt: 1 }).limit(50);
    socket.emit("chatHistory", messages);
    console.log(`Sent chat history to user ${socket.id}`, messages);
  } catch (error) {
    console.error("Error retrieving chat history:", error);
  }

  socket.on("message", async (msg: { text: string; username: string }) => {
    console.log(`Message received from ${socket.id}: ${msg.text}`);

    try {
      const newMessage = new Message({
        text: msg.text,
        username: msg.username,
      });

      await newMessage.save();

      io.emit("message", newMessage);
      console.log("Message broadcasted to all clients:", newMessage);
    } catch (error) {
      console.error("Error saving or broadcasting message:", error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected. Reason: ${reason}`);
  });

  socket.on("error", (err) => {
    console.error(`Socket error on ${socket.id}:`, err);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
