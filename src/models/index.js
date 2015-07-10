var orm      = require('orm');

var connection = null;

function setup(db, cb) {
  require('./permissionModel')(orm, db);
  require('./groupModel')(orm, db);
  require('./userModel')(orm, db);
  return cb(null, db);
}

module.exports = function(connectionString) {
  return function(cb) {
    if (connection) {
      return cb(null, connection);
    }
    orm.connect(connectionString, function(err, db) {
      if (err) {
        return cb(err);
      }

      connection = db;
      db.settings.set('instance.returnAllErrors', true);
      setup(db, cb);
    });
  };
};