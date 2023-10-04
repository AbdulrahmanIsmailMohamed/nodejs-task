module.exports = (sequelize, Sequalize) => {
  const OTP = sequelize.define("OTP", {
    id: {
      type: Sequalize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    OTP: {
      type: Sequalize.STRING,
      defaultValue: "111111",
    },
    status: {
      type: Sequalize.STRING,
    },
    expire: {
      type: Sequalize.DATE,
      allowNull: false,
    },
    userId: { 
      type: Sequalize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: Sequalize.DATE,
      defaultValue: Sequalize.NOW,
    },
  });

  return OTP;
};
