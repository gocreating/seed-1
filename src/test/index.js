var assert = require('assert');
var expect = require('chai').expect;
var request = require('request');

describe('User Module', function() {
  describe('Routing', function() {
    it('should respond to GET', function(done) {
      request
        .get('https://localhost:5000/')
        .end(function(res) {
          assert(res.ok);
          assert('Safe and secure!' === res.text);
          done();
        });

      // superagent
      //   .get('http://localhost:' + 5000)
      //   .end(function(res) {
      //     console.log(res);
      //     expect(res.status).to.equal(200);
      //     // done();
      //   });
    });
  });
});