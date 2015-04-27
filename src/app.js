var express = require('express');
var environment = require('./configs/environment');
var database = require('./configs/database');
var routes = require('./configs/routes');
var server = require('./configs/server');

var app = express();

// setup environment
environment(app);

// setup database connection and models
database(app);

// setup routing
routes(app);

// launch the server
server(app);