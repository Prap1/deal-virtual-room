const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const messageController = require("../controllers/chatController");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"], // Fixed casing
    },
  });

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Listen for auth token
    socket.on("authenticate", (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        console.log(`User authenticated: ${socket.userId}`);
      } catch (error) {
        console.error("Authentication error:", error.message);
        socket.emit("unauthorized", { message: "Invalid or expired token" });
        socket.disconnect();
      }
    });

    // Handle incoming messages
    socket.on("sendMessage", (data) => {
      if (!socket.userId) {
        return socket.emit("unauthorized", { message: "Not authenticated" });
      }
      messageController.sendMessage(socket, data);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}

module.exports = initializeSocket;
