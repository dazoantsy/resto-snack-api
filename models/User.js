const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "staff", "viewer"],
      default: "viewer",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
