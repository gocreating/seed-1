// server modules
var http = require('http');
var https = require('https');
var fs = require('fs'); // To read ssl key and cert

// settings
var settings = require('./settings');

module.exports = function(app) {
  /**
   * http server
   */
  http
    .createServer(app)
    .listen(settings.server.port.development, function() {
      console.log(
        'HTTP server listening on port',
        settings.server.port.development
      );
    });

  /**
   * https server
   */
  // // load openssl generated privateKey
  // var privateKey = fs.readFileSync('secrets/ssl_key.pem', 'utf8');
  // // load openssl generated certificate
  // var certificate = fs.readFileSync('secrets/ssl_key_cert.pem', 'utf8');
  // // create credentials object to create ssl
  // var credentials = {
  //   key: privateKey,
  //   cert: certificate,
  // };
  // https
  //   .createServer(credentials, app)
  //   .listen(config.app.port.https, function() {
  //     console.log('HTTPS server listening on port ' + config.app.port.https);
  //   });
};