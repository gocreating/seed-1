export default class TokenExpiration extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 401;
    this.title = title || 'Token expired';
    this.detail = detail || 'The bearer token has expired';
  }
};