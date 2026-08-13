const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pieces: {
    type: Number,
    required: true,
  },
  cut: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  gift: {
    type: Boolean,
    required: true,
  },
  personalize: { //the object can be null or contain the following fields depending on the gift bool
    theme: {
      type: String,
      required: false,
    },
    mystery: {
      type: Boolean,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    sender: {
      type: String,
      required: false,
    },
    receiver: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
  },
  plays: {
    type: Number,
    required: true,
    default:0
  },
  visibility: {
    type: String,
    required: true,
    enum: ["public", "private"],
  },
  status: {
    type: String,
    required: true,
    enum: ["accepted", "rejected"],
  },
  deletedAt:{
    type: Date,
    default: null,
  }
},
{
  timestamps: true, 
});
module.exports = {
    puzzleSchema,
};