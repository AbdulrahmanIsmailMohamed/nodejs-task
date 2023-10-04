const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const {
  registerValidor,
  verifyValidator,
  loginValidator,
} = require("../utils/validations/auth.validate");

const router = Router();

const authController = new AuthController();

router.post("/register", registerValidor, authController.register);
router.post("/verify", verifyValidator, authController.otpVerification);
router.post("/login", loginValidator, authController.login);

module.exports = router;
