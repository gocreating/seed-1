var orm      = require('orm');
var settings = require('../configs/settings');

var connection = null;

function setup(db, cb) {
  require('./permissionModel')(orm, db);
  require('./groupModel')(orm, db);
  require('./userModel')(orm, db);
  return cb(null, db);
}

module.exports = function(cb) {
  if (connection) {
    return cb(null, connection);
  }

  var db;
  // @ifdef DEV
  db = settings.db.development;
  // #endif
  // @ifdef PROD
  db = settings.db.production;
  // #endif
  orm.connect(db, function(err, db) {
    if (err) {
      return cb(err);
    }

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};