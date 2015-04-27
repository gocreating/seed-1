module.exports = function(orm, db) {
  var User = db.define('user', {
    username:   {type: 'text', size: 25},
    password:   {type: 'text', size: 128}, // the password is a hash value
    email:      {type: 'text', size: 62},
    group:      {type: 'boolean'},
    photo:      {type: 'text', size: 100}, // stores the file path
    isVerified: {type: 'boolean'},
    socialType: {type: 'integer'},
    openId:     {type: 'integer'},
    socialData: {type: 'object'},
  });
};