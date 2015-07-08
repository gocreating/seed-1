module.exports = function unauthorizeError(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 401;
  this.title = title || 'Unauthorized';
  this.detail = detail || 'the user is not authorized';
};

require('util').inherits(module.exports, Error);