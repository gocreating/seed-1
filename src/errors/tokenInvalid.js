module.exports = function(title, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'tokenInvalid';
  this.status = 400;
  this.title = title || 'Invalid token';
  this.detail = detail || 'this token is malformed';
};