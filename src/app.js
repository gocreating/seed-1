var express = require('express');

var environment = require('./configs/environment');
var routes = require('./configs/routes');
var server = require('./configs/server');

var app = express();

environment(app);

/**
 * Routing
 */

// var urlMapping = require('./routes');
// var methods = ['get', 'post', 'put', 'delete'];
// for (var path in urlMapping) {
//   var action = urlMapping[path];
//   var routeChain = app.route(path);
//   methods.forEach(function(method) {
//     if (action[method] !== undefined) {
//       if (action[method] instanceof Array) {
//         action[method].forEach(function(middleware) {
//           routeChain[method](middleware);
//         });
//       } else {
//         routeChain[method](action[method]);
//       }
//     }
//   });
// };
routes(app);

// 404 not found
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  res.status(404);
  res.send('not  found');
});

server(app);