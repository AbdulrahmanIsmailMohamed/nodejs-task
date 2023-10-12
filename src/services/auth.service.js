const bcrypt = require("bcrypt");

const { catchError } = require("../utils/catchError");
const APIError = require("../utils/apiError");
const db = require("../models");

const User = db.user;
const OTP = db.otp;
const Op = db.Sequelize.Op;

class AuthService {
  register = async (userData) => {
    const password = bcrypt.hashSync(userData.password, 11);

    // User registeration
    const user = await catchError(
      User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        mobile: userData.mobile,
        password,
      })
    );
    if (!user) throw new APIError("occur error when you register", 400);

    // create OTP
    const id = user.dataValues.id;
    const otp = this.createOTP(id, OTP);
    if (!otp) {
      await user.destroy();
      console.log("User data deleted due to error during registration.");
      throw new APIError("occur error when you register", 400);
    }

    return user.dataValues.id;
  };

  otpVerification = async (id, otp) => {
    console.log(id);
    const otpVerify = await catchError(
      OTP.findOne({
        where: {
          userId: id,
          OTP: otp,
          expire: {
            [Op.gt]: db.Sequelize.fn("NOW"),
          },
        },
      })
    );
    if (!otpVerify) throw new APIError("OTP not exist");

    const user = await catchError(
      User.update(
        { verifiedBoolean: true },
        {
          where: { id },
        }
      )
    );

    if (user) {
      await otpVerify.destroy();
    }

    return "Done";
  };

  login = async (mobile, password) => {
    const user = await catchError(User.findOne({ where: { mobile } }));
    if (!user) throw new APIError("Your data not exist", 404);

    const isPasswordValid = bcrypt.compareSync(
      password,
      user.dataValues.password
    );

    if (!isPasswordValid) {
      await catchError(this.handleInvalidPassword(user));
    } else {
      const id = user.dataValues.id;
      if (user.verifiedBoolean === false) {
        await catchError(this.createOTP(id, OTP));
        return { id, message: "OTP Sent" };
      } else {
        await catchError(this.resetUserLock(user));
        return {
          id,
          name: `${user.dataValues.firstName} ${user.dataValues.lastName}`,
        };
      }
    }
  };

  createOTP = async (id, OTP) => {
    const resetCodeExpire = new Date(Date.now() + 4 * 60 * 1000); // expire after 4 minutes
    const otp = await catchError(
      OTP.create({
        status: "pending",
        expire: resetCodeExpire,
        userId: id,
      })
    );
    return otp;
  };

  resetUserLock = async (user) => {
    user.limit = 0;
    user.block = false;
    user.dateLimit = null;
    await catchError(user.save());
  };

  handleInvalidPassword = async (user) => {
    if (user.block === false) {
      if (user.limit < 3) {
        user.limit += 1;
        await catchError(user.save());
        throw new APIError("Invalid email or password");
      } else {
        user.limit = 0;
        user.block = true;
        user.dateLimit = Date.now() + 1000 * 60 * 60 * 24;
        await catchError(user.save());
        throw new APIError(
          "You have exceeded the maximum number of attempts. Try again after 24 hours.",
          400
        );
      }
    } else {
      if (user.dateLimit < Date.now()) {
        this.resetUserLock(user);
        throw new APIError("Invalid email or password");
      } else {
        throw new APIError(
          "You have exceeded the maximum number of attempts. Try again after 24 hours.",
          400
        );
      }
    }
  };
}

module.exports = AuthService;
