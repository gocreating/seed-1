export default class FormValueInvalid extends Error {
  constructor(title, detail, errs) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 422;
    this.title = title || 'Invalid form value';
    this.detail = detail || 'something wrong in the input values';

    var validationErrors = [];
    errs.forEach((err) => {
      validationErrors.push({
        property: err.property,
        msg: err.msg,
      });
    });
    this.validationErrors = validationErrors;
  }
};