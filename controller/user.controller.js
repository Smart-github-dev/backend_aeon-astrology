const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.profileUpdate = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      findUser.email = req.body.email;
      findUser.username = req.body.username;
      findUser.birth = req.body.birth;
      findUser.phonenumber = req.body.phonenumber;
      findUser.gender = req.body.gender;
      findUser.settings = req.body.settings;
      const user = await findUser.save();

      if (user) {
        res.send({ success: true, user });
      }
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
