const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, 
    },
    authProvider: {
      type: String,
      enum: ["email", "google"],
      required: true,
      default: "email",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = { UserSchema };