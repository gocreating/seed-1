var DatabaseError = require('../errors/database');

module.exports = function(orm, db) {
  var Group = db.define('group', {
    name: {type: 'text', size: 40},
  });

};