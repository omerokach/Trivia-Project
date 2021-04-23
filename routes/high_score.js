const { Router } = require("express");
const router = Router();
const highScoreController = require("../controllers/highScoreController");

router.get("/", highScoreController.highScores_get);

module.exports = router;
