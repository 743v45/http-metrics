'use strict';

const http = require('http');
const https = require('https');
const util = require('./util');

// 参数注释

exports.request = function(options, safe, callback) {
  if (typeof safe === 'function') {
    callback = safe;
    safe = false;
  }
  let request = safe ? https.request : http.request;
  let startTime = new Date();

  let req = request(options);

  let result = {
    namelookup: 0,
    starttranster: 0,
    total_time: 0,
    appconnect: 0,
    time_connect: 0
  };

  req.on('response', function(res) {
    res.on('data', function() {
      if (!result.starttranster) {
        result.starttranster = util.timeToNow(startTime);
      }
    });
    res.on('end', function(res) {
      result.total_time = util.timeToNow(startTime);
      return callback(null, result);
    });
    res.on('error', function(err) {
      return callback(err, result);
    });
  });

  req.on('socket', function(s) {
    s.on('secureConnect', function() {
      result.appconnect = util.timeToNow(startTime);
    });
    s.on('lookup', function() {
      result.namelookup = util.timeToNow(startTime);
    });
    s.on('connect', function() {
      result.time_connect = util.timeToNow(startTime);
    });
  });
  req.end();
};
