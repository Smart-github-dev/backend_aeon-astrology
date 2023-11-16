const router = require("express").Router();
const userRouter = require("./routes/userRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const authRouter = require("./routes/authRoutes");
const verifyToken = require("./middleware");
router.use("/user", verifyToken, userRouter);
router.use("/notification", verifyToken, notificationRouter);
router.use("/auth", authRouter);
module.exports = router;
