const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    puzzleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Puzzle",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      required: true,
      default: "pending",
    },
    transactionId: {
      type: String,
      required: false, // won't exist yet at creation, only once the processor responds
    },
  },
  { timestamps: true }
);

module.exports = { paymentSchema };