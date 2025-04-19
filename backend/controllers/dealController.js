const redisClient = require("../config/redis");
const Deal = require("../model/deal");

exports.createDeal = async (req, res) => {
  try {
    const { title, description, price, sellerId } = req.body;
const userId = req.user.userId;
const role = req.user.role;

if (!title || !description || !price) {
  return res.status(400).json({ message: "Missing required fields" });
}

// Role check
if (role === "seller") {
  // Seller is creating a deal; treat them as seller
  if (!userId) return res.status(400).json({ message: "Invalid seller ID" });

  const deal = await Deal.create({
    sellerId: userId,
    buyerId: null, // maybe null or a default if needed
    title,
    description,
    price,
  });

  await redisClient.setex(`deal:${deal._id}`, 3600, JSON.stringify(deal));
  return res.status(201).json({ message: "Deal created by seller", deal });

} else if (role === "buyer") {
  // Buyer creates a deal for a seller
  if (!sellerId) return res.status(400).json({ message: "Seller ID is required" });

  const deal = await Deal.create({
    buyerId: userId,
    sellerId,
    title,
    description,
    price,
  });

  await redisClient.setex(`deal:${deal._id}`, 3600, JSON.stringify(deal));
  return res.status(201).json({ message: "Deal created by buyer", deal });
} else {
  return res.status(403).json({ message: "Unauthorized role" });
}

  } catch (error) {
    console.error("❌ Error creating deal:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getDeal = async (req, res) => {
  try {
    const cachedDeals = await redisClient.get("deals");
    if (cachedDeals) {
      console.log("Deals fetched from reddis cache");
      return res.status(200).json({
        deals: JSON.stringify(cachedDeals),
      });
    }
    console.log("Deals not found in Redis, fetching from MongoDB...");
    const deals = await Deal.find();
    await redisClient.setex("deals", 3600, JSON.stringify(deals));
    res.status(200).json({
      deals,
    });
  } catch (error) {
    console.error("Error fetching deals:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDealById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check Redis cache first
    const cachedDeal = await redisClient.get(`deal:${id}`);

    if (cachedDeal) {
      console.log(`Deal ${id} fetched from Redis cache`);
      return res.status(200).json({ deal: JSON.parse(cachedDeal) });
    }

    console.log(`Deal ${id} not found in Redis, fetching from MongoDB...`);
    const deal = await Deal.findById(id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // Store the deal in Redis cache for 1 hour (3600 seconds)
    await redisClient.setex(`deal:${id}`, 3600, JSON.stringify(deal));

    res.status(200).json({ deal });
  } catch (error) {
    console.error("Error fetching deal:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDealStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { dealId } = req.params;
    let deal = await redisClient.get(`deal:${dealId}`);

    if (deal) {
      console.log(`Deal ${dealId} fetched from Redis cache`);
      deal = JSON.parse(deal);
    } else {
      deal = await Deal.findByIdAndUpdate(dealId, { status }, { new: true });

      if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
      }
    }
    await redisClient.setex(`deal:${dealId}`, 3600, JSON.stringify(deal));

    res.status(200).json({
      message: "Deal status updated successfully",
      deal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
