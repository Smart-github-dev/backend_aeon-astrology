const db = require("../../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
