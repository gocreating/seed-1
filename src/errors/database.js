module.exports = function(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'database';
  this.status = 500;
  this.title = title || 'Something wrong when accessing the database';
};

require('util').inherits(module.exports, Error);