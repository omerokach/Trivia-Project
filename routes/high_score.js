const { Router } = require("express");
const router = Router();
const highScoreController = require("../controllers/highScoreController");

router.get("/", highScoreController.highScores_get);
router.post("/", highScoreController.highScores_post);

module.exports = router;
