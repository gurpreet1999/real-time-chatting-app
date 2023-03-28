const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MESSAGE",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const CHAT = mongoose.model("CHAT", chatModel);
module.exports = CHAT;
