class ErrorHandlingMW {
  static forDevelopment(err, res) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  static forProduction(err, res) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  static handleError(err, req, res, next) {
    err.status = err.status || "Error";
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === "development") {
      ErrorHandlingMW.forDevelopment(err, res);
    } else {
      ErrorHandlingMW.forProduction(err, res);
    }
  }
}

module.exports = ErrorHandlingMW;
