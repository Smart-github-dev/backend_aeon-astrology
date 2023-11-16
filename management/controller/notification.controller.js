const db = require("../../models");
const User = db.user;
const Notification = db.notify;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getNotifications = async (req, res) => {
  try {
    const data = await Notification.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
