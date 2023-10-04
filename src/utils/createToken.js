const jwt = require("jsonwebtoken");

exports.token = (user_id) =>
  jwt.sign(
    {
      user_id,
    },
    process.env.JWT_SEC,
    { expiresIn: process.env.JWT_EXPIRE }
  );
