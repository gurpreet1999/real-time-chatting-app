const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CHAT",
    },
  },
  {
    timestamps: true,
  }
);

const MESSAGE = mongoose.model("MESSAGE", messageModel);
module.exports = MESSAGE;
