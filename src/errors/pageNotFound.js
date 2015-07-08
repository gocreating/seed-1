module.exports = function(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'pageNotFound';
  this.status = 404;
  this.title = title || 'Page not found';
};

require('util').inherits(module.exports, Error);