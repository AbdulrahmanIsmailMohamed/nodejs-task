const authRoutes = require("./auth");

exports.mountRoute = (app) => {
  app.use("/api/auth", authRoutes);
};
