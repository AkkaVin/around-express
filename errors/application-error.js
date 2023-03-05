class ApplicationError extends Error {
  constructor(statusCode, message, name = '') {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
  }
}
module.exports = ApplicationError;
