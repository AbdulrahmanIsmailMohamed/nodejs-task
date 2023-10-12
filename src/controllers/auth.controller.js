const asyncHandler = require("express-async-handler");
const AuthService = require("../services/auth.service");
const APIError = require("../utils/apiError");
const { token } = require("../utils/createToken");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  register = asyncHandler(async (req, res, next) => {
    const userData = req.body;
    const user_id = await this.authService.register(userData);
    if (!user_id) {
      return next(new APIError("Occur Error when you register", 400));
    }
    
    res.status(201).json({
      Success: true,
      id: user_id,
      message: "OTP sent",
    });
  });

  otpVerification = asyncHandler(async (req, res, next) => {
    const id = req.body.id;
    const otp = req.body.otp;

    const otpVerify = await this.authService.otpVerification(id, otp);
    if (!otpVerify) {
      return next(new APIError("Invalid OTP", 400));
    }

    res.status(200).json({ Success: true });
  });

  login = asyncHandler(async (req, res, next) => {
    const { mobile, password } = req.body;

    const user = await this.authService.login(mobile, password);
    if (user.message) {
      console.log("test");
      res.status(400).json({
        Success: false,
        id: user.id,
        message: user.message,
      });
    } else {
      res.status(200).json({
        Success: true,
        token: token(user.id),
      });
    }
  });
}

module.exports = AuthController;
