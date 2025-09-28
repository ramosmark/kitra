const { ERRORS } = require("./constants");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.VALIDATION;
    this.message = message;
    this.status = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.UNAUTHORIZED;
    this.status = 401;
  }
}

module.exports = { BadRequestError, UnauthorizedError };
