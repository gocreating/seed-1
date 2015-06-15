var express  = require('express');
var path  = require('path');
var renderer = require('react-engine');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
// Store session in mysql database
// var SessionStore = require('express-mysql-session');

module.exports = function(app) {
  /**
   * view engine setup
   */

  // create the view engine with `react-engine`
  var engine = renderer.server.create();

  // set the engine
  app.engine('.jsx', engine);

  // set the view directory
  // app.set('views', __dirname + '\/..\/views');
  app.set('views', path.join(__dirname, '/../views'));

  // set js as the view engine
  app.set('view engine', 'jsx');

  // finally, set the custom view
  app.set('view', renderer.expressView);

  /**
   * serve static files
   */
  app.use(express.static(__dirname + '/../assets'));
  app.use(favicon(__dirname + '/../assets/favicon.ico'));

  /**
   * logger
   */
  app.use(morgan(
    ':remote-addr ' +
    ':status ' +
    ':method ' +
    ':url\t' +
    ':res[content-length] - ' +
    ':response-time ms'
  ));

  /**
   * parser
   */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  // app.use(cookieParser());
  // // parse session (req.session)
  // app.use(session({
  //   secret: config.secret.sessionSecret,
  //   resave: true,
  //   saveUninitialized: true,
  //   store: new SessionStore({
  //     host: config.db.host,
  //     port: config.db.port,
  //     user: config.db.user,
  //     password: config.db.password,
  //     database: config.db.database,
  //   }),
  // }));

  // authentication
  app.use(passport.initialize());
  app.use(passport.session());
};