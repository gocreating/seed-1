module.exports = function tokenExpirationError(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 401;
  this.title = title || 'Token expired';
};

require('util').inherits(module.exports, Error);