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
  login: {
    get: function(req, res) {
      res.render('user/login');
    },
    post: function(req, res) {
      res.redirect('/user/profile');
    },
  },
  logout: function(req, res) {
    res.redirect('/');
  },
  profile: function(req, res) {
    res.render('user/profile');
  },
  test: function(req, res) {
    var User = require('../models/UserModel');
    res.send('nothing');
  },
};