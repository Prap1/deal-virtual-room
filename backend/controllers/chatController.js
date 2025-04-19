const redisClient = require("../config/redis");
const Message = require("../model/message");

exports.sendMessage = async (socket, data) => {
  try {
    const { dealId, text } = data;
    if (!socket.userId) {
      return socket.emit("error", { message: "User not authenticated" });
    }

    const message = await Message.create({
      dealId,
      senderId: socket.userId,
      text,
    });
    await redisClient.lpush(`messages:${dealId}`, JSON.stringify(message));
    await redisClient.ltrim(`messages:${dealId}`, 0, 49);
    socket.to(dealId).emit("newMessage", message);
  } catch (error) {
    console.error("Error sending message:", error.message);
    socket.emit("error", { error: error.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const message = await Message.find({ dealId: req.params.dealId });
    res.status(200).json({
      message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
