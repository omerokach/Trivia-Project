const { Router } = require("express");
const router = Router();
const ratingController = require("../controllers/ratingController");

router.get("/", ratingController.ratings_get);
router.post("/", ratingController.ratings_post);

module.exports = router;
