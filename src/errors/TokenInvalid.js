module.exports = function tokenInvalidError(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 400;
  this.title = title || 'Invalid token';
  this.detail = detail || 'this token is malformed';
};

require('util').inherits(module.exports, Error);