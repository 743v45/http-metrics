'use strict';
const request = require('../index').request;
const should = require('should');

describe('index.js', function() {
  context('request', function() {
    it('should return result when having a HTTP request', function(done) {
      this.timeout(10000);
      request('http://www.sina.com.cn', function(err, data) {
        should.ifError(err);
        should.exist(data);
        should.equal(data.time_appconnect, 0);
        should.notEqual(data.time_namelookup, 0);
        should.notEqual(data.time_starttransfer, 0);
        should.notEqual(data.time_total, 0);
        should.notEqual(data.time_connect, 0);
        return done();
      });
    });

    it('should return result when having a HTTPS request', function(done) {
      this.timeout(10000);
      request('https://www.baidu.com', function(err, data) {
        should.ifError(err);
        should.exist(data);
        should.notEqual(data.time_appconnect, 0);
        should.notEqual(data.time_namelookup, 0);
        should.notEqual(data.time_starttransfer, 0);
        should.notEqual(data.time_total, 0);
        should.notEqual(data.time_connect, 0);
        done();
      });
    });

    it('should return result when having a HTTPS request and host is IP without certificates', function(done) {
      this.timeout(10000);
      request('https://192.30.252.120', function(err) {
        should.exist(err);
        done();
      });
    });

    it('should return result when having a HTTP request and host is IP', function(done) {
      this.timeout(10000);
      request('http://61.172.201.194', function(err, data) {
        should.ifError(err);
        should.exist(data);
        should.equal(data.time_appconnect, 0);
        should.equal(data.time_namelookup, 0);
        should.notEqual(data.time_starttransfer, 0);
        should.notEqual(data.time_total, 0);
        should.notEqual(data.time_connect, 0);
        return done();
      });
    });
  });
});
