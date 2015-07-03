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
    var paths = [
      '/user/register',
      '/user/login',
      '/user/logout',
      '/user/profile',
    ];

    paths.forEach(function(path) {
      it('should respond to GET ' + path, function(done) {
        request
          .get(base + path)
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});