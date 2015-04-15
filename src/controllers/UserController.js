module.exports = {
  register: function(req, res) {
    res.render('user/register');
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
    // var Person = require('../models/testmodel');
    res.send('nothing');
  }
};