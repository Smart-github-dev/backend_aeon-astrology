const mongoose = require("mongoose");

const Notifications = mongoose.model(
  "Chat",
  new mongoose.Schema({
    userid: String,
    question: String,
    history: {
      type: [
        {
          content: String,
          isQuestion: Boolean,
        },
      ],
    },
    createdAt: { type: Date, default: Date.now },
  })
);

module.exports = Notifications;
