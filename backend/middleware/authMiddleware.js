const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis"); // make sure this is your configured Redis instance

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 1. Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }

    // 2. Optional: Check if token is still active in Redis
    const cachedToken = await redisClient.get(`token:${decoded.userId}`);
    if (cachedToken !== token) {
      return res.status(403).json({ message: "Session expired or invalidated. Please log in again." });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
