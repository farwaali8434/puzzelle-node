const mongoose = require("mongoose");
const PlayStatsModal = require("../playStats/modals");

const playDataSchema = new mongoose.Schema(
  {
    playerType: {
      type: String,
      enum: ["registered", "anonymous"],
      required: true,
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    sessionId: {
      type: String,
      required: false,
    },
    puzzleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Puzzle",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    resumeCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["started", "completed", "abandoned"],
      required: true,
      default: "started",
    },
    progressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayProgress",
      required: false,
    },
    hiddenAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

playDataSchema.index({ playerId: 1, puzzleId: 1, status: 1 });
playDataSchema.index({ sessionId: 1, puzzleId: 1, status: 1 });

playDataSchema.post("save", async function (doc) {
  try {
    await PlayStatsModal.findOneAndUpdate(
      { puzzleId: doc.puzzleId },
      {
        $inc: { attempts: 1 },
        $setOnInsert: { createdBy: doc.createdBy },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.log("Failed to update playStats on creation:", error);
  }
});

playDataSchema.post("save", async function (doc) {
  try {
    await PlayStatsModal.findOneAndUpdate(
      { puzzleId: doc.puzzleId },
      {
        $inc: { attempts: 1 },
        $setOnInsert: { createdBy: doc.createdBy },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.log("Failed to update playStats on creation:", error);
  }
});

module.exports = { playDataSchema };
