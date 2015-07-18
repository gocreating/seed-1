export default (orm, db) => {
  const Permission = db.models.permission;
  const Group = db.define('group', {
    name: {type: 'text', size: 40},
  });

  Group.hasMany('permission', Permission);
};