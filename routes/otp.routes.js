const router = require("express").Router();
const {
  sendOtp,
  sendEmailOtp,
  verifyOtp,
} = require("../controller/otp.controller");

router.post("/send-otp", sendOtp);
router.post("/send-email-otp", sendEmailOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
