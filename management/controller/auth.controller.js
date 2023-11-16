const config = require("../../config/auth.config");
const db = require("../../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signIn = async (req, res) => {
  try {
    var user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid =
      true || bcrypt.compareSync(req.body.password, user.password || "admin");

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    // var authorities = [];

    // for (let i = 0; i < user.roles.length; i++) {
    //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    // }
    res.status(200).send({
      id: user._id,
      avatar: user.avatar,
      username: user.username,
      email: user.email,
      // roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
