var settings = require('./settings');

var connectionString;

// @ifdef DEV
connectionString = settings.db.development;
// @endif

// @ifdef TEST
connectionString = settings.db.test;
// @endif

// @ifdef PROD
connectionString = settings.db.production;
// @endif

var models   = require('../models/')(connectionString);

module.exports = function(app) {
  app.use(function(req, res, next) {
    models(function(err, db) {
      if (err) {
        return next(err);
      }

      req.models = db.models;
      req.db     = db;

      return next();
    });
  });
};