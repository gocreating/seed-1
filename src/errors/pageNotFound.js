module.exports = function PageNotFoundError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 404;
  this.message = message || 'Page not found';
};
 
require('util').inherits(module.exports, Error);