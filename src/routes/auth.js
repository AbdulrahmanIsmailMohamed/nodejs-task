const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");

const router = Router();

const authController = new AuthController();

router.post("/register", authController.register);
router.post("/verify", authController.otpVerification);
router.post("/login", authController.login);

module.exports = router;
