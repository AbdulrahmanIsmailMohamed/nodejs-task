const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const HowFoundUs = sequelize.define("HowFoundUs", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.STRING,
    },
  });

  return HowFoundUs;
};
