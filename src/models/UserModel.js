var DatabaseError = require('../errors/database');

module.exports = function(orm, db) {
  var Group = db.models.group;
  var User = db.define('user', {
    username:   {type: 'text', size: 25},
    password:   {type: 'text', size: 32}, // the password is a hash value
    email:      {type: 'text', size: 62},
    photo:      {type: 'text', size: 100}, // stores the file path
    isVerified: {type: 'boolean'},
    socialType: {type: 'integer'},
    openId:     {type: 'integer'},
    socialData: {type: 'object'},
  });

  User.hasOne('group', Group);

  /**
   * Register a new user
   *
   * @param {object} newUser
   *  - The user object that will be created
   *
   * @param {function} cb(err, isExist, user)
   *  - The callback function
   *
   * @param {boolean} cb().isExist
   *  - Whether the user is already exitsting
   *
   * @param {object} cb().user
   *  - The user object just created
   */
  User.register = function(newUser, cb) {
    User.exists({username: newUser.username}, function(err, isExist) {
      if (err) {
        return cb(new DatabaseError());
      }
      if (isExist) {
        return cb(null, true, null);
      } else {
        // hashing the password
        var crypto = require('crypto');
        var passwordHash = newUser.password;
        var recursiveLevel = 5;
        while (recursiveLevel) {
          passwordHash = crypto
            .createHash('md5')
            .update(passwordHash)
            .digest('hex');
          recursiveLevel -= 1;
        }
        newUser.password = passwordHash;

        // create new user
        User.create(newUser, function(err, user) {
          if (err) {
            return cb(err, true, null);
          }

          Group
            .find({name: 'user'})
            .first(function(err, group) {
              user.setGroup(group, function(err) {
                return cb(null, false, user);
              });
            });
        });
      }
    });
  };

  User.auth = function(email, password) {

  };
};