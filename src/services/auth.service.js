const bcrypt = require("bcrypt");

const { createOTP } = require("../utils/createOTP");
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
    const otp = await createOTP(id, OTP);
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
    bcrypt.compareSync(password, user.dataValues.password);

    if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
      throw new APIError("Your data not exist", 404);
    }
    const id = user.dataValues.id;
    if (user.verifiedBoolean === false) {
      await createOTP(id, OTP);
      return { id, message: "OTP Sent" };
    } else {
      return {
        id,
        name: `${user.dataValues.firstName} ${user.dataValues.lastName}`,
      };
    }
  };
}

module.exports = AuthService;
