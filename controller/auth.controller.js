const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const {
    username,
    email,
    birth,
    gender,
    location,
    color,
    fullname,
    password,
    phonenumber,
    birthplace,
  } = req.body;
  const user = new User({
    username,
    email,
    birth,
    gender,
    location,
    fullname,
    phonenumber,
    birthplace,
    color,
    password: bcrypt.hashSync(password),
  });

  try {
    const result = await user.save();
    if (result) {
      const token = jwt.sign({ id: result._id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < result.roles.length; i++) {
        authorities.push("ROLE_" + result.roles[i].name.toUpperCase());
      }
      res.send({
        success: true,
        message: "User was registered successfully!",
        user: result,
        roles: authorities,
        accessToken: token,
      });
    }
  } catch (error) {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }
  }
};

exports.signIn = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user._id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

exports.verifyExists = async (req, res) => {
  const data = req.body;
  const user = await User.findOne(data);
  res.send({
    exists: user ? true : false,
  });
  return;
};

exports.displayName = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      findUser.fullname = req.body.fullName;
      findUser.color = req.body.color;
      const result = await findUser.save();
      if (result) res.send({ message: "successfully", success: true });
    } else {
      if (result) res.send({ message: "successfully", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

exports.chooseUsername = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.body.username });
    if (findUser) {
      res.send({ success: true, user: findUser });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.choosePassword = (req, res) => {
  res.send({ success: true });
};
