var DatabaseError = require('../errors/database');

module.exports = function(app) {
  app.use(function(err, req, res, next) {
    switch (err.name) {
      case 'DatabaseError': {
        console.log('Database Error');
        break;
      }
      case 'PageNotFoundError': {
        console.log('Page not found');
        res.send('404');
        return;
      }
      default: {
        console.log('Unknown Error');
      }
    }

    res.status(err.status || 500);

    // send the error
    if (req.xhr || req.get('content-type') == 'application/json') {
      res.json({
        message: err.message,
      });
    } else {
      res.render('error/index', {
        message: err.message,
        stack: err.stack,
      });
    }
  });
};