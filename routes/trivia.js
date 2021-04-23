const { Router } = require("express");
const router = Router();
const triviaController = require("../controllers/triviaController");

router.get("/saved_question", triviaController.savedQuestion_get);

router.get("/generate_question", triviaController.generateQuestion_get)

module.exports = router;
