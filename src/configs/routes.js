var General = require('../controllers/generalController');
var User = require('../controllers/userController');

var userModule = require('../modules/userModule');

var PageNotFoundError = require('../errors/pageNotFound');

module.exports = function(app) {
  // general routing
  app.get('/',              General.home);
  app.get('/about',         General.about);

  // user routing
  app.get ('/user/register',  User.register.get);
  app.post('/user/register',  User.register.post);
  app.get ('/user/login',     User.login);
  app.get ('/user/logout',    User.logout);
  app.get ('/user/profile',   userModule.middleware.requireLogin, User.profile);
  app.post('/api/user/login', User.api.login);

  // 404 page not found
  app.use(function(req, res, next) {
    next(new PageNotFoundError());
  });
};