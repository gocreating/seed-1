var chai = require('chai');
var expect = chai.expect;
var request = require('superagent');

describe('Default', function() {
  describe('Routing', function() {
    var base = 'http://localhost:5000';
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
    var base = 'http://localhost:5000';
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