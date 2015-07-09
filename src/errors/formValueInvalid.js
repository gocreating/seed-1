module.exports = function(title, detail, errs) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'formValueInvalid';
  this.status = 422;
  this.title = title || 'Invalid form value';
  this.detail = detail || 'something wrong in the input values';

  var validationErrors = [];
  errs.forEach(function(err) {
    validationErrors.push({
      property: err.property,
      msg: err.msg,
    });
  });
  this.validationErrors = validationErrors;
};