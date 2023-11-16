const mongoose = require("mongoose");

const Notifications = mongoose.model(
  "Notify",
  new mongoose.Schema({
    title: String,
    content: String,
    permissions: String,
    read: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  })
);

module.exports = Notifications;
