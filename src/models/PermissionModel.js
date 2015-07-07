var DatabaseError = require('../errors/Database');

module.exports = function(orm, db) {
  var Permission = db.define('permission', {
    name: {type: 'text', size: 40},
  });
};