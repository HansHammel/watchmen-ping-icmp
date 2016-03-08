var assert = require('assert');

describe('ping service icmp', function () {

  it('should fail if can\'t  resolve address', function (done) {
    var pingService = require('../index');
    var instance = new pingService();
    instance.ping({url: 'irhgihrsgkrshgbkrshgs'}, function (error,body,response,time) {
      assert.ok(error.indexOf('ENOTFOUND') > -1);
      done();
    });
  });

  it('should fail if can\'t ping', function (done) {
    var pingService = require('../index');
    var instance = new pingService();
    instance.ping({url: '0.0.0.0'}, function (error,body,response,time) {
      assert.ok(error.indexOf('No route to host') > -1);
      done();
    });
  });

  it('should work with HOSTNAME', function (done) {
    var pingService = require('../index');
    var instance = new pingService();
    instance.ping({url: 'localhost'}, function (error,body,response,time) {
      assert.ifError(error);
      done();
    });
  });

  it('should work with URL', function (done) {
    var pingService = require('../index');
    var instance = new pingService();
    instance.ping({url: 'http://localhost'}, function (error,body,response,time) {
      assert.ifError(error);
      done();
    });
  });

  it('should work with IP', function (done) {
    var pingService = require('../index');
    var instance = new pingService();
    instance.ping({url: '127.0.0.1'}, function (error,body,response,time) {
      assert.ifError(error);
      done();
    });
  });

});
