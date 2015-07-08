var chai = require('chai');
var expect = chai.expect;
var request = require('superagent');

var app = require('../app');
var http = require('http');

var serverPort = 4567;
var base = 'http://localhost:' + serverPort;

before(function(done) {
  http
    .createServer(app)
    .listen(serverPort, function() {
      done();
    });
});

describe('Default', function() {
  describe('Routing', function() {
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

  describe('API', function() {
    describe('/api/user/login', function() {
      it('should retrieve a valid token', function(done) {
        var loginUser = {
          username: 'root',
          password: 'root',
        };

        request
          .post(base + '/api/user/login')
          .send(loginUser)
          .end(function(err, res) {
            expect(res).to.not.be.undefined;

            var jwt = require('jwt-simple');
            var settings = require('../configs/settings');
            var decoded = jwt.decode(
              res.body.data.bearerToken,
              settings.user.bearerToken.secret
            );
            var actualUser = decoded.user;

            expect(loginUser.username).to.equal(actualUser.username);
            done();
          });
      });
    });
  });
});