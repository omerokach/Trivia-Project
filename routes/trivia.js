const { Router } = require("express");
const router = Router();
const triviaController = require("../controllers/triviaController");

router.get("/saved_question", triviaController.savedQuestion_get);

module.exports = router;
