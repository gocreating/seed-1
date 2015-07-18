export default (orm, db) => {
  const Permission = db.define('permission', {
    name: {type: 'text', size: 40},
  });
};