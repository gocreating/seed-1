module.exports = function DatabaseError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 500;
  this.message = message || 'Something wrong when accessing the database';
};
 
require('util').inherits(module.exports, Error);