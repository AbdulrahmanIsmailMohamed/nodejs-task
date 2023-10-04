class APIError extends Error {
  statusCode;
  status;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
  }
}

module.exports = APIError;
