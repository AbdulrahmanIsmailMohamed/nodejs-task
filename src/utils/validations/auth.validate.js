const { check } = require("express-validator");

const validatorMW = require("../../middlewares/validatorMW");

const registerValidor = [
  check("firstName")
    .notEmpty()
    .withMessage("The firstName must be not null")
    .isString()
    .withMessage("The firstName must be String")
    .isLength({ min: 2 })
    .withMessage("The firstName is short")
    .isLength({ max: 50 })
    .withMessage("The firstName is long"),

  check("lastName")
    .notEmpty()
    .withMessage("The lastName must be not null")
    .isString()
    .withMessage("The lastName must be String")
    .isLength({ min: 2 })
    .withMessage("The lastName is short")
    .isLength({ max: 50 })
    .withMessage("The lastName is long"),

  check("age").notEmpty().withMessage("The age must be not null"),

  check("mobile")
    .notEmpty()
    .withMessage("The Number must be not null")
    .isString()
    .withMessage("The Number must be String")
    .isMobilePhone(["ar-EG", "ar-SA", "ar-YE"])
    .withMessage("This number invalid"),

  check("password")
    .notEmpty()
    .withMessage("The password must be not null")
    .isString()
    .withMessage("The password must be String")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    }),

  validatorMW
];

const loginValidator = [
  check("mobile")
    .notEmpty()
    .withMessage("The Number must be not null")
    .isString()
    .withMessage("The Number must be String")
    .isMobilePhone(["ar-EG", "ar-SA", "ar-YE"])
    .withMessage("This number invalid"),

  check("password")
    .notEmpty()
    .withMessage("The password must be not null")
    .isString()
    .withMessage("The password must be String")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    }),

  validatorMW
];

const verifyValidator = [
  check("id").notEmpty().withMessage("The Number must be not null"),

  check("otp").notEmpty().withMessage("The password must be not null"),

  validatorMW
];

module.exports = {
  loginValidator,
  registerValidor,
  verifyValidator,
};
