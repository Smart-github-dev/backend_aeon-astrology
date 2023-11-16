const router = require("express").Router();

const controller = require("../controller/chat.controller");

router.get("/top-questions", controller.getTopQuestions);

router.get("/historie", controller.getHistory);

router.get("/histories", controller.getHistories);

router.post("/histories/:userid", controller.storeHistory);

router.post("/ai-answer/", controller.getAiAnswer);

module.exports = router;
