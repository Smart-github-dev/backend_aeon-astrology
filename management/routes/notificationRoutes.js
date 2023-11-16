const router = require("express").Router();
const controller = require("../controller/notification.controller");

router.get("/all", controller.getNotifications);

module.exports = router;
