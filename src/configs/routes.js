var General = require('../controllers/GeneralController');
var User = require('../controllers/UserController');

module.exports = function(app) {
  app.get( '/',              General.home);
  app.get( '/about',         General.about);

  app.get( '/user/register', User.register);
  app.get( '/user/login',    User.login.get);
  app.post('/user/login',    User.login.post);
  app.get( '/user/logout',   User.logout);
  app.get( '/user/profile',  User.profile);

  app.get( '/test',          User.test);
};