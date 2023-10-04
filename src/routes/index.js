const authRoutes = require("./auth.routes");

exports.mountRoute = (app) => {
  app.use("/api/auth", authRoutes);
};
