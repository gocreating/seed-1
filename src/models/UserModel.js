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

  /**
   * Register a new user
   * @param {object}   newUser                - The user object that will be created
   * @param {function} cb(err, isExist, user) - The callback function
   * @param {boolean}  cb().isExist           - Whether the user is already exitsting
   * @param {object}   cb().user              - The user object just created
   */
  User.register = function(newUser, cb) {
    User.exists({username: newUser.username}, function(err, isExist) {
      if (err) return cb(err, true, null);
      if (isExist) {
        return cb(null, true, null);
      } else {
        User.create(newUser, function(err, results) {
          if (err) return cb(err, true, null);
          return cb(null, false, results);
        });
      }
    });
  };

  User.login = function(email, password) {
    
  };
};