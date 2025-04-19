const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dealRoutes = require("./routes/dealRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const redisClient = require("./config/redis");
const initializeSocket = require("./config/socket");
require("events").EventEmitter.defaultMaxListeners = 20;
const documentRoutes = require("./routes/documentRoutes");

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/deal", dealRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/document", documentRoutes);
app.use("/uploads", express.static("uploads"));

// Create HTTP server
const server = createServer(app);

// Initialize Socket.io
const io = initializeSocket(server);

// Redis Events
redisClient.on("connect", () => {
  console.log("🔌 Connected to Redis...");

  // Start server
  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Connection Error:", err);
});
