import userModule from '../modules/userModule';

export default {
  register: (req, res) => {
    res.render('user/register');
  },
  login: (req, res) => {
    res.render('user/login');
  },
  logout: (req, res) => {
    userModule.logout(req, res);
    res.redirect('/');
  },
  profile: (req, res) => {
    res.render('user/profile');
  },
  api: {
    create: (req, res, next) => {
      const newUser = {
        username: req.body.username,
        password: req.body.password,
        isVerified: false,
      };

      req.models.user.register(newUser, (err, isExist, user) => {
        if (err) {
          return next(err);
        }
        if (isExist) {
          res.json({
            errors: [
              {
                title: 'user already exist',
                detail: 'the username is duplicated',
              },
            ],
          });
        } else {
          var u = JSON.parse(JSON.stringify(user));
          delete u.group;
          delete u.password;

          res.json({
            data: {
              user: u,
            },
            errors: [],
          });
        }
      });
    },
    login: (req, res, next) => {
      req.models.user.auth(
        req.body.username,
        req.body.password,
        (err, user) => {
          if (err) {
            return next(err);
          }
          if (user) {
            var bearerToken = userModule.generateBearerToken(user);
            userModule.login(req, res, bearerToken);
            res.json({
              data: {
                bearerToken: bearerToken,
              },
              errors: [],
            });
          } else {
            res.json({
              errors: [
                {
                  title: 'cannot login',
                  detail: 'either the username or the password is wrong',
                },
              ],
            });
          }
        }
      );
    },
  },
};