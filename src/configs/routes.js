var General = require('../controllers/GeneralController');
var User = require('../controllers/UserController');

module.exports = function(app) {
  // general routing
  app.get( '/',              General.home);
  app.get( '/about',         General.about);

  app.get( '/user/register', User.register.get);
  app.post('/user/register', User.register.post);
  app.get( '/user/login',    User.login.get);
  app.post('/user/login',    User.login.post);
  app.get( '/user/logout',   User.logout);
  app.get( '/user/profile',  User.profile);

  app.get( '/test',          User.test);

  // 404 page not found
  app.use(function(req, res, next) {
    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
    res.status(404);
    res.send('not  found');
  });
};