const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.post("/signup", usersController.signUp_post);
router.post("/login", usersController.login_post);


module.exports = router;
