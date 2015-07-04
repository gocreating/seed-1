var orm      = require('orm');
var settings = require('../configs/settings');

var connection = null;

function setup(db, cb) {
  require('./PermissionModel')(orm, db);
  require('./GroupModel')(orm, db);
  require('./UserModel')(orm, db);
  return cb(null, db);
}

module.exports = function(cb) {
  if (connection) {
    return cb(null, connection);
  }

  orm.connect(settings.db, function(err, db) {
    if (err) {
      return cb(err);
    }

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};