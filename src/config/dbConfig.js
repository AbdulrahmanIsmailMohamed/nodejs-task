module.exports = {
  HOST: process.env.HOST,
  USER:  "mysql",
  PASSWORD: process.env.PASS,
  DB: process.env.DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
