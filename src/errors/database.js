module.exports = function DatabaseError(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 500;
  this.title = title || 'Something wrong when accessing the database';
};

require('util').inherits(module.exports, Error);