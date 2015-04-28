var express = require('express');
var environment = require('./configs/environment');
var database = require('./configs/database');
var routes = require('./configs/routes');
var errorHandler = require('./configs/errorHandler');
var server = require('./configs/server');

var app = express();

// setup environment
environment(app);

// setup database connection and models
database(app);

// setup routing
routes(app);

// error handling
errorHandler(app);

// launch the server
server(app);