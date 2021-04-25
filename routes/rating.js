const { Router } = require("express");
const router = Router();
const ratingController = require("../controllers/ratingController");

router.post("/", ratingController.ratings_post);

module.exports = router;
