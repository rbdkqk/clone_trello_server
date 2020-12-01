const express = require("express");
const router = express.Router();

const { authController } = require("../controllers");

router.post("/login", authController.login.post);
router.post("/logout", authController.logout.post);
router.post("/signup", authController.signup.post);

module.exports = router;
