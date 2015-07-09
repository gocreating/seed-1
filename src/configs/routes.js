var General = require('../controllers/generalController');
var User = require('../controllers/userController');
var userModule = require('../modules/userModule');
var errors = require('../errors/');

module.exports = function(app) {
  // general routing
  app.get('/',              General.home);
  app.get('/about',         General.about);

  // user routing
  app.get ('/user/register',  User.register);
  app.get ('/user/login',     User.login);
  app.get ('/user/logout',    User.logout);
  app.get ('/user/profile',   userModule.middleware.requireLogin, User.profile);
  app.post('/api/user',       User.api.create);
  app.post('/api/user/login', User.api.login);

  // 404 page not found
  app.use(function(req, res, next) {
    next(new errors.pageNotFound());
  });
};