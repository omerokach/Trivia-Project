const { Router } = require("express");
const router = Router();
const triviaController = require("../controllers/triviaController");

router.get("/all_saved_questions", triviaController.allSavedQuestions_get);

router.get("/saved_question", triviaController.savedQuestion_get);

router.get("/generate_question", triviaController.generateQuestion_get)

router.post("/save_new_question", triviaController.saveNewQuestion_post)

module.exports = router;
