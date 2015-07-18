var express  = require('express');
var path  = require('path');
var renderer = require('react-engine');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var userModule = require('../modules/userModule');

module.exports = function(app) {
  /**
   * view engine setup
   */

  // create the view engine with `react-engine`
  var engine = renderer.server.create();

  // set the engine
  app.engine('.jsx', engine);

  // set the view directory
  app.set('views', path.join(__dirname, '..', 'views'));

  // set js as the view engine
  app.set('view engine', 'jsx');

  // finally, set the custom view
  app.set('view', renderer.expressView);

  /**
   * serve static files
   */
  app.use(express.static(path.join(__dirname, '..', 'assets')));
  app.use(favicon(path.join(__dirname + '..', 'assets', 'favicon.ico')));

  /**
   * logger
   */
  app.use(morgan(
    ':remote-addr\t' +
    ':status ' +
    ':method ' +
    ':url\t' +
    ':res[content-length] - ' +
    ':response-time ms'
  ));

  /**
   * parser
   */

  // form value parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  // cookie parser
  app.use(cookieParser());

  // token parser
  app.use(userModule.middleware.tokenParser());

  // authentication
  app.use(passport.initialize());
  app.use(passport.session());
};