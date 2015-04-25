// server modules
var http = require('http');
var https = require('https');
var fs = require("fs"); // To read ssl key and cert

module.exports = function(app) {
  // http server
  http
    .createServer(app)
    .listen(3000, function(){
      console.log('HTTP  server listening on port ' + 3000);
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
};