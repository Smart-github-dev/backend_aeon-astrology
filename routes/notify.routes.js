const router = require("express").Router();
const { authJwt } = require("../middlewares");
const controller = require("../controller/notification.controller");

router.post("/get", controller.getNotify);
router.get("/push", [authJwt.verifyToken], controller.pushNotify);
router.get("/read", [authJwt.verifyToken], controller.readOne);

module.exports = router;
