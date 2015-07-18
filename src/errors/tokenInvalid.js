export default class TokenInvalid extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 400;
    this.title = title || 'Invalid token';
    this.detail = detail || 'this token is malformed';
  }
};