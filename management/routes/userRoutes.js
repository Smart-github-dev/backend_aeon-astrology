const router = require("express").Router();
const controller = require("../controller/user.controller");

router.get("/getusers", controller.getUsers);

module.exports = router;
