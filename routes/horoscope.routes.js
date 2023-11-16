const router = require("express").Router();

const controller = require("../controller/horoscope.controller");

router.get("/hints/:sign", controller.getTodayHints);
router.get("/:day/:sign", controller.getHoroscopeByDay);
router.post("/planets/report", controller.getPlanetsReport);
router.post("/planets",controller.getPlanets);
router.get("/sun_sign_prediction/:type/:zodiacName",controller.getPredictionDaily)


module.exports = router;
