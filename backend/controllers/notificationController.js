// controllers/notificationController.js
const Notification = require("../model/notification");
const redisClient = require("../config/redis");


  exports.getNotifications = async (req, res) => {
    try {
      const userId = req.user.userId;
      const cacheKey = `notifications:${userId}`;
      const cached = await redisClient.get(cacheKey);
  
      if (cached) {
        return res.status(200).json(JSON.parse(cached));
      }
  
      const data = await Notification.find({ userId, isRead: false });
  
      // ✅ Use ioredis-compatible syntax
      await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 60);
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
exports.markAsRead = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { isRead: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    await redisClient.del(`notifications:${updated.userId.toString()}`);
    res.json({ message: "Marked as read", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
