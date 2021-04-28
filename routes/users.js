const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.post("/signup", usersController.signup_post);
router.post("/login", usersController.login_post);
router.get("/logout", usersController.logout_get);

module.exports = router;
