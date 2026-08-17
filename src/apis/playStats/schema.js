const mongoose = require("mongoose");

const playStatsSchema = new mongoose.Schema(
  {
    puzzleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Puzzle",
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    completions: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0,
    },
    avgSolveTime: {
      type: Number,
      default: 0,
    },
    fastestTime: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

playStatsSchema.index({ createdBy: 1 });

module.exports = { playStatsSchema };