const router = require("express").Router();

const controller = require("../controller/friend.controller");

router.get("/allContacts", controller.getContacts);

router.post("/addRequest", controller.addRequest);

router.post("/acceptResponse", controller.acceptResponse);

router.post("/rejectResponse", controller.rejectResponse);

router.get("/getFriends", controller.getFriends);

router.post("/removeFriend", controller.removeFriend);

module.exports = router;
