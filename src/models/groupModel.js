module.exports = function(orm, db) {
  var Permission = db.models.permission;
  var Group = db.define('group', {
    name: {type: 'text', size: 40},
  });

  Group.hasMany('permission', Permission);
};