module.exports = function(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'tokenExpiration';
  this.status = 401;
  this.title = title || 'Token expired';
};

require('util').inherits(module.exports, Error);