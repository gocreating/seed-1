export default class Database extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 500;
    this.title = title || 'Cannot access database';
    this.detail = detail || 'Something wrong when accessing the database';
  }
};