var models   = require('../models/');

function makeDummyData(db) {
  db.sync(function() {    
    // add your dummy data
  });
}

module.exports = function(app) {
  app.use(function (req, res, next) {
    models(function (err, db) {
      if (err) return next(err);

      req.models = db.models;
      req.db     = db;

      makeDummyData(db);

      return next();
    });
  });
};