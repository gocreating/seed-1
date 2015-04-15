var General = require('./controllers/GeneralController');
var User = require('./controllers/UserController');

module.exports = {
  '/':              General.home,
  '/about':         General.about,
  '/user/register': User.register,
  '/user/login':    User.login,
  '/user/logout':   User.logout,
  '/user/profile':  User.profile,
  '/test':          User.test,
};