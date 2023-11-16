const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    avatar: {
      type: String,
      default: "default.png",
    },
    username: String,
    email: String,
    password: String,
    phonenumber: String,
    fullname: String,
    birth: String,
    gender: Boolean,
    location: String,
    zipcode: String,
    color: String,
    availableMessages: {
      type: Number,
      default: 5,
    },
    friends: {
      type: [
        {
          userid: String,
          status: String,
        },
      ],
      default: [],
    },
    settings: {
      daily_digests: Boolean,
      someone_added: Boolean,
      eros: Boolean,
      solar_returns: Boolean,
      premium: String,
      subscribe: String,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
