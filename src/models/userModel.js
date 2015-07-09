var DatabaseError = require('../errors/database');
var FormValueInvalidError = require('../errors/formValueInvalid');

var encodePassword = function(rawPassword) {
  var crypto = require('crypto');
  var recursiveLevel = 5;
  while (recursiveLevel) {
    rawPassword = crypto
      .createHash('md5')
      .update(rawPassword)
      .digest('hex');
    recursiveLevel -= 1;
  }
  return rawPassword;
};

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
  }, {
    validations: {
      username: orm.enforce.ranges.length(
        4, 25, 'username should be 4 ~ 25 characters'),
    },
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
        newUser.password = encodePassword(newUser.password);

        // create new user
        Group
          .find({name: 'user'})
          .first(function(err, group) {
            var u = new User(newUser);
            u.setGroup(group, function(err) {
              u.save(function(err) {
                if (err) {
                  cb(new FormValueInvalidError(null, null, err));
                }
                return cb(err, false, u);
              });
            });
          });

        // User.create(newUser, function(err, user) {
        //   if (err) {
        //     return cb(err, true, null);
        //   }

        //   Group
        //     .find({name: 'user'})
        //     .first(function(err, group) {
        //       user.setGroup(group, function(err) {
        //         return cb(null, false, user);
        //       });
        //     });
        // });
      }
    });
  };

  /**
   * Authenticate user by `username` and `password`
   *
   * @param {string} username
   *  - The username that will be authenticated
   *
   * @param {string} password
   *  - The raw (not hashed) password that will be authenticated
   *
   * @param {function} cb(err, user)
   *  - The callback function
   *
   * @param {object} cb().user
   *  - Return null if the user is failed to authenticate
   *  - Return the authenticated user object if successfully authenticate
   */
  User.auth = function(username, password, cb) {
    User.one({
      username: username,
      password: encodePassword(password),
    }, function(err, user) {
      cb(err, user);
    });
  };
};