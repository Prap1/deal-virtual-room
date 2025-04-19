const User =require("../model/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const redisClient = require("../config/redis");

exports.register =async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const user =await User.create({name,email,password:hashedPassword,role});
        user.password=undefined;
        res.status(201).json({message:"User registered Sucessfully",user});

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Try to fetch from Redis cache
    const cachedUser = await redisClient.get(`user:${email}`);
    let user;

    if (cachedUser) {
      console.log("✅ User fetched from Redis");
      user = JSON.parse(cachedUser);

      // Always fetch password separately for security
      const dbUser = await User.findOne({ email }).select("+password");
      if (!dbUser) return res.status(404).json({ message: "User not found" });

      user.password = dbUser.password;
    } else {
      console.log("🛑 User not in cache, fetching from MongoDB...");
      user = await User.findOne({ email }).select("+password");
      if (!user) return res.status(404).json({ message: "User not found" });

      // Store user in Redis (without password)
      const { password, ...userData } = user._doc;
      await redisClient.setex(`user:${email}`, 3600, JSON.stringify(userData));
    }

    if (!user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Store session token in Redis
    await redisClient.setex(`token:${user._id}`, 3600, token);

    // 5. Send response without password
    const { password: _, ...userWithoutPass } = user;
    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: userWithoutPass,
    });

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};



exports.logout = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const userId = req.user.userId;

        await redisClient.del(`token:${userId}`);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};