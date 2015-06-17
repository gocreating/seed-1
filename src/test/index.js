var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

describe('User Module', function() {
  describe('Routing', function() {
    var paths = [
      '/user/register',
      '/user/login',
      '/user/logout',
      '/user/profile'
    ];

    paths.forEach(function(path) {
      it('should respond to GET ' + path, function(done) {
        request('http://localhost:5000' + path)
          .get()
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});