var userModule = require('../modules/userModule');

module.exports = {
  register: {
    get: function(req, res) {
      res.render('user/register', {
        msg: '',
      });
    },
    post: function(req, res, next) {
      var newUser = {
        username: req.body.username,
        password: req.body.password,
        isVerified: false,
      };

      req.models.user.register(newUser, function(err, isExist, user) {
        if (err) {
          return next(err);
        }
        if (isExist) {
          res.render('user/register', {
            msg: 'User already exist',
          });
        } else {
          res.redirect('/user/login');
        }
      });
    },
  },
  login: function(req, res) {
    res.render('user/login');
  },
  logout: function(req, res) {
    userModule.logout(req, res);
    res.redirect('/');
  },
  profile: function(req, res) {
    res.render('user/profile');
  },
  api: {
    login: function(req, res, next) {
      req.models.user.auth(
        req.body.username,
        req.body.password,
        function(err, user) {
          if (err) {
            return next(err);
          }
          if (user) {
            var bearerToken = userModule.generateBearerToken(user);
            userModule.login(req, res, bearerToken);
            res.json({
              data: {
                bearerToken: bearerToken,
              },
              errors: [],
            });
          } else {
            res.json({
              errors: [
                {
                  title: 'cannot login',
                  detail: 'either the username or the password is wrong',
                },
              ],
            });
          }
        }
      );
    },
  },
};