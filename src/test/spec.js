var chai = require('chai');
var expect = chai.expect;
var request = require('superagent');

var app = require('../app');
var http = require('http');

var serverPort = 4567;
before(function(done) {
  http
    .createServer(app)
    .listen(serverPort, function() {
      done();
    });
});

describe('Default', function() {
  describe('Routing', function() {
    var base = 'http://localhost:' + serverPort;
    it('should respond 404 to GET /doesNotExist', function(done) {
      request
        .get(base + '/doesNotExist')
        .end(function(err, res) {
          expect(res).to.not.be.undefined;
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});

describe('User Module', function() {
  describe('Routing', function() {
    var base = 'http://localhost:' + serverPort;
    var routes = [
      ['/user/register', 200],
      ['/user/login',    200],
      ['/user/logout',   200],
      ['/user/profile',  401], // unauthorized status before login
    ];

    routes.forEach(function(route) {
      it(
        'should respond ' +
        route[1] +
        ' to GET ' +
        route[0],

        function(done) {
          request
            .get(base + route[0])
            .end(function(err, res) {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(route[1]);
              done();
            });
        }
      );
    });
  });
});