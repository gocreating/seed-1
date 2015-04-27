module.exports = {
  register: {
    get: function(req, res) {
      res.render('user/register');
    },
    post: function(req, res) {
      var newUser = {};
      newUser.username = req.body.username;
      newUser.password = req.body.password;
      newUser.isVerified = false;
      req.models.user.create(newUser, function(err, results) {
        console.log('new user');
        res.redirect('/user/login');
      });
    }
  },
  login: {
    get: function(req, res) {
      res.render('user/login');
    },
    post: function(req, res) {
      res.redirect('/user/profile');
    }
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
  }
};