export default class Unauthorize extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 401;
    this.title = title || 'Unauthorized';
    this.detail = detail || 'the user is not authorized';
  }
};