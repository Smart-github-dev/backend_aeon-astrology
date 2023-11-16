const router = require("express").Router();
const { verifySignUp } = require("../middlewares");
const {
  signIn,
  signUp,
  verifyExists,
  chooseUsername,
  choosePassword,
  displayName,
} = require("../controller/auth.controller");

router.post(
  "/sign-up",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signUp
);

router.post("/display-name", displayName);

router.post("/sign-in", signIn);
router.post("/verify-exists", verifyExists);

router.post("/choose-username", chooseUsername);

router.post("/choose-password", choosePassword);

module.exports = router;
