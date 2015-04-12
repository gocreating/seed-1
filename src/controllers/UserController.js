// var account = {
//   username: 'admin',
//   password: 'admin',
//   isAuth: false
// };
var isAuth = false;

var loginRequired = function(req, res, next) {
  if (isAuth) {
    next();
  } else {
    res.render('error/401');
  }
};

module.exports = {
  register: {
    get: function(req, res) {
      res.render('user/register');
    },
    post: function(req, res) {
      res.redirect('/home');
    }
  },
  login: {
    get: function(req, res) {
      res.render('user/login');
    },
    post: function(req, res) {
      isAuth = true;
      res.redirect('/user/profile');
    }
  },
  logout: {
    get: function(req, res) {
      isAuth = false;
      res.redirect('/');
    }
  },
  profile: {
    get: [
      loginRequired,
      function(req, res) {
        res.render('user/profile');
      }
    ]
  }
};