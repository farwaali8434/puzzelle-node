const mongoose = require("mongoose");

const playProgressSchema = new mongoose.Schema(
  {
    attemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayData",
      required: true,
      unique: true,
    },
    puzzleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Puzzle",
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
    progress: {
      type: Number,
      default: 0, // piece count, cheap summary — same pattern Jigsaw Planet used, avoids decoding the full array just to show "9 placed"
    },
    pieces: [
      {
        _id: false,
        pieceId: { type: Number, required: true },
        position: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
        placed: { type: Boolean, default: false },
        placedAt: { type: Date, required: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = { playProgressSchema };