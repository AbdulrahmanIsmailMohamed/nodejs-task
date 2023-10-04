const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const ErrorHandlingMW = require("./middlewares/errorHandling");
const APIError = require("./utils/apiError");
const { mountRoute } = require("./routes");
const db = require("./models");

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));

// connectDB
db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});


// routes
mountRoute(app);

app.all("*", (req, res, next) => {
  next(new APIError(`Can't Find This Route ${req.originalUrl}!!`, 404));
});

// Glopal error Handling in express
const errorHandling = (err, req, res, next) => {
  ErrorHandlingMW.handleError(err, req, res, next);
};
app.use(errorHandling);

module.exports = app;
