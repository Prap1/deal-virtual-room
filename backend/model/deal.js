const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // ✅ Indexed for faster queries
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // ✅ Indexed for faster queries
    },
    title: {
      type: String,
      required: true,
      trim: true, // ✅ Removes extra spaces
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // ✅ Ensures price is non-negative
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true } // ✅ Auto-generates createdAt & updatedAt
);

module.exports = mongoose.model("Deal", dealSchema);
