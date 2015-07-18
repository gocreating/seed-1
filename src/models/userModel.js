import errors from '../errors/';

const encodePassword = (rawPassword) => {
  const crypto = require('crypto');
  let recursiveLevel = 5;
  while (recursiveLevel) {
    rawPassword = crypto
      .createHash('md5')
      .update(rawPassword)
      .digest('hex');
    recursiveLevel -= 1;
  }
  return rawPassword;
};

export default (orm, db) => {
  const Group = db.models.group;
  const User = db.define('user', {
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
  User.register = (newUser, cb) => {
    User.exists({username: newUser.username}, (err, isExist) => {
      if (err) {
        return cb(new errors.database());
      }
      if (isExist) {
        return cb(null, true, null);
      } else {
        newUser.password = encodePassword(newUser.password);

        // create new user
        Group
          .find({name: 'user'})
          .first((err, group) => {
            var u = new User(newUser);
            u.setGroup(group, (err) => {
              u.save((err) => {
                if (err) {
                  cb(new errors.formValueInvalid(null, null, err));
                }
                return cb(err, false, u);
              });
            });
          });
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
  User.auth = (username, password, cb) => {
    User.one({
      username: username,
      password: encodePassword(password),
    }, (err, user) => {
      cb(err, user);
    });
  };
};