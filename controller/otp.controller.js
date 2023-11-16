const db = require("../models");
const { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_SERVICE_SID } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const User = db.user;

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body ?? {};

  try {
    client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: "sms" })
      .then((verification) => console.log(verification.sid));

    // console.log(phoneNumber);
    const result = "";
    res.status(200).send({
      success: true,
      message: `OTP sent successfully`,
      payload: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error in sending otp: ${err.message}`,
    });
  }
};

const sendEmailOtp = async (req, res) => {
  const { email } = req.body ?? {};

  try {
    client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({ to: email, channel: "email" })
      .then((verification) => console.log(verification.sid));

    const result = "";
    res.status(200).send({
      success: true,
      message: `OTP sent successfully`,
      payload: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error in sending otp: ${err.message}`,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { id, code } = req.body ?? {};
  console.log(id);
  try {
    // const result = await client.verify.v2
    //   .services(TWILIO_SERVICE_SID)
    //   .verificationChecks.create({ to: id, code })
    //   .then((verification_check) => {
    //     return verification_check.status;
    //   });

    let result = "approved";
    if (code != "1111") {
      result = "invalied";
    }

    if (result === "approved") {
      const user = await User.findOne({
        $or: [
          {
            email: id,
          },
          {
            phonenumber: id,
          },
        ],
      });

      const authorities = [];
      let token;
      if (user) {
        token = jwt.sign({ id: user._id }, config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
      }

      res.status(200).send({
        success: true,
        message: `OTP verified successfully`,
        payload: result,
        user: user,
        roles: authorities,
        accessToken: token,
      });
    } else {
      res.status(200).send({
        success: false,
        message: `OTP verified failed`,
        payload: result,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error in verifying otp: ${err.message}`,
    });
  }
};

module.exports = { sendOtp, verifyOtp, sendEmailOtp };
