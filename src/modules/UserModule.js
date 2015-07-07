var jwt = require('jwt-simple');
var moment = require('moment');
var settings = require('../configs/settings');

var TokenExpirationError = require('../errors/tokenExpiration');
var TokenInvalidError = require('../errors/tokenInvalid');

module.exports = {
  middleware: {
    tokenParser: function(req, res, next) {
      var bearerHeader = req.headers['authorization'];

      // token exist, parse it
      if (typeof bearerHeader !== 'undefined') {
        var bearerToken = bearerHeader.split(' ')[1];

        // well-formed token
        try {
          var decoded = jwt.decode(
            bearerToken,
            settings.user.bearerToken.secret
          );

          // token expired
          if (decoded.expiration <= Date.now()) {
            throw new TokenExpirationError();

          // token does not expire
          } else {
            req.bearerToken = bearerToken;
            req.user = decoded.user;
            next();
          }

        // malformed token
        } catch (err) {
          throw new TokenInvalidError();
        }

      // token does not exist, does not parse it
      } else {
        next();
      }
    },
  },
  generateBearerToken: function(user) {
    var token = jwt.encode({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      expiration: moment()
        .add(
          settings.user.bearerToken.expiration.split(' ')[0],
          settings.user.bearerToken.expiration.split(' ')[1]
        )
        .valueOf(),
    }, settings.user.bearerToken.secret);

    return token;
  },
};