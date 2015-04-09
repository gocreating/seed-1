/**
 * Load Dependencies
 */

// middlewares
var expressLayouts = require('express-ejs-layouts');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// framework
var express = require('express');

// server modules
var http = require('http');
var https = require('https');

// other modules
var SessionStore = require('express-mysql-session'); // Store session in mysql database
var fs = require("fs"); // To read ssl key and cert
var passport = require('passport');

/**
 * Apply Middlewares and Configurations
 */

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout/main')
app.use(expressLayouts);

// server static file
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

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
app.use(passport.initialize());
app.use(passport.session());

/**
 * Apply Custom Middlewares
 */

// error handlers
// if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/index', {
    message: err.message,
    error: err,
    layout: false
  });
});
// }

/**
 * Routing and Validation
 */

app.use('/', require('./routes/index'));
app.use('/api/user', require('./routes/user'));

// 404 not found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Run Server
 */

// http server
http
  .createServer(app)
  .listen(4000, function(){
    console.log('HTTP  server listening on port ' + 4000);
  });

// https server
// var privateKey = fs.readFileSync('secrets/ssl_key.pem', 'utf8');       //load openssl generated privateKey
// var certificate = fs.readFileSync('secrets/ssl_key_cert.pem', 'utf8'); //load openssl generated certificate
// //create credentials object to create ssl
// var credentials = {
//     key: privateKey,
//     cert: certificate
// };
// https
//     .createServer(credentials, app)
//     .listen(config.app.port.https, function () {
//         console.log('HTTPS server listening on port ' + config.app.port.https);
//     });