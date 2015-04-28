var models   = require('../models/');

module.exports = function(app) {
  app.use(function (req, res, next) {
    models(function (err, db) {
      if (err) return next(err);

      req.models = db.models;
      req.db     = db;

      return next();
    });
  });
};