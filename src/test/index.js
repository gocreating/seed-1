var assert = require('chai').assert;
var expect = require('chai').expect;
var request = require('supertest');

describe('User Module', function() {
  describe('Routing', function() {
    it('should respond to GET /', function(done) {
      request('http://localhost:5000/')
        .get()
        .end(function(err, res) {
          expect(res).to.not.be.undefined;
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});