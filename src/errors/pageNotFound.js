export default class PageNotFound extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 404;
    this.title = title || 'Page not found';
    this.detail = detail || 'The url you are requesting does not exist';
  }
};