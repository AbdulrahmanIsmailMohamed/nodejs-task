module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    verifiedBoolean: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    limit: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    block: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    dateLimit: {
      type: Sequelize.DATE,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  User.associate = (models) => {
    // User.hasMany(models.OTP, { foreignKey: "UserId" });
    User.belongsTo(models.HowFoundUs, { foreignKey: "howFoundUs_id" });
  };

  return User;
};
