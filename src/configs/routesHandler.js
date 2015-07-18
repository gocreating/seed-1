import General from '../controllers/generalController';
import User from '../controllers/userController';
import userModule from '../modules/userModule';
import errors from '../errors/';

export default (app) => {
  // general routing
  app.get('/',      General.home);
  app.get('/about', General.about);

  // user routing
  app.get ('/user/register',  User.register);
  app.get ('/user/login',     User.login);
  app.get ('/user/logout',    User.logout);
  app.get ('/user/profile',   userModule.middleware.requireLogin, User.profile);
  app.post('/api/user',       User.api.create);
  app.post('/api/user/login', User.api.login);

  // 404 page not found
  app.use((req, res, next) => {
    next(new errors.pageNotFound());
  });
};