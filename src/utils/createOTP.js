const { catchError } = require("./catchError");

exports.createOTP = async (id, OTP) => {
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
