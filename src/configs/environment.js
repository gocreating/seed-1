var express  = require('express');
// var expressLayouts = require('express-ejs-layouts');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
// var SessionStore = require('express-mysql-session'); // Store session in mysql database

var models   = require('../models/');

module.exports = function(app) {
  // view engine setup
  app.set('views', __dirname + '\/..\/views');
  app.set('view engine', 'ejs');
  // app.set('layout', 'layout/main')
  // app.use(expressLayouts);

  // serve static files
  app.use(express.static(__dirname + '/../assets'));
  app.use(favicon(__dirname + '/../assets/favicon.ico'));

  // logger
  app.use(morgan('dev'));

  // parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  // app.use(cookieParser());
  // app.use(session({                                    // parse session (req.session)
  //     secret: config.secret.sessionSecret,
  //     resave: true,
  //     saveUninitialized: true,
  //     store: new SessionStore({
  //         host: config.db.host,
  //         port: config.db.port,
  //         user: config.db.user,
  //         password: config.db.password,
  //         database: config.db.database
  //     })
  // }));

  // authentication
  app.use(passport.initialize());
  app.use(passport.session());

  // database
  app.use(function (req, res, next) {
    models(function (err, db) {
      if (err) return next(err);

      req.models = db.models;
      req.db     = db;

      return next();
    });
  });

  // error handling
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/index', {
      message: err.message,
      error: err,
      layout: false
    });
  });
};