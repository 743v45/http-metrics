'use strict';
var request = require('../index').request;
var should = require('should');

describe('index.js', function() {
  context('request', function() {
    it('should return result when having a HTTP request', function(done) {
      request({
        host: 'www.sina.com.cn'
      }, function(err, data) {
        should.ifError(err);
        should.exist(data);
        should.equal(data.appconnect, 0);
        should.notEqual(data.namelookup, 0);
        should.notEqual(data.starttranster, 0);
        should.notEqual(data.total_time, 0);
        should.notEqual(data.time_connect, 0);
        return done();
      });
    });

    it('should return result when having a HTTPS request', function(done) {
      request({
        host: 'www.baidu.com'
      }, true, function(err, data) {
        should.ifError(err);
        should.exist(data);
        should.notEqual(data.appconnect, 0);
        should.notEqual(data.namelookup, 0);
        should.notEqual(data.starttranster, 0);
        should.notEqual(data.total_time, 0);
        should.notEqual(data.time_connect, 0);
        done();
      });
    });

    it('should return result when having a HTTPS request and host is IP without certificates', function(done) {
      request({
        host: '220.181.57.217' // 百度 IP
      }, true, function(err, data) {
        should.exist(err);
        done();
      });
    });

    it('should return result when having a HTTP request and host is IP', function(done) {
      request({
        host: '61.172.201.194' // 新浪 IP
      }, function(err, data) {
        should.ifError(err);
        should.exist(data);
        should.equal(data.appconnect, 0);
        should.equal(data.namelookup, 0);
        should.notEqual(data.starttranster, 0);
        should.notEqual(data.total_time, 0);
        should.notEqual(data.time_connect, 0);
        return done();
      });
    });
  });
});
