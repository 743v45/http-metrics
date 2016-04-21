'use strict';

const http = require('http');
const https = require('https');
const url = require('url');
const util = require('./util');

function request(options, callback) {
  if (typeof options === 'string') {
    options = url.parse(options);
    if (!options.hostname) {
      callback(new Error('Unable to determine the domain name'));
    }
  }

  if (options.protocol === 'https:') {
    options._defaultAgent = https.globalAgent;
  }

  let startTime = new Date();
  let req = http.request(options);

  let result = {
    time_namelookup: 0,
    time_starttransfer: 0,
    time_total: 0,
    time_appconnect: 0,
    time_connect: 0
  };

  req.on('response', function(res) {
    res.on('data', function() {
      if (!result.time_starttransfer) {
        result.time_starttransfer = util.timeToNow(startTime);
      }
    });
    res.on('end', function() {
      result.time_total = util.timeToNow(startTime);
      return callback(null, result);
    });
    res.on('error', function(err) {
      return callback(err, result);
    });
  });
  req.on('error', function(err) {
    return callback(err, result);
  });

  req.on('socket', function(s) {
    s.on('secureConnect', function() {
      result.time_appconnect = util.timeToNow(startTime);
    });
    s.on('lookup', function() {
      result.time_namelookup = util.timeToNow(startTime);
    });
    s.on('connect', function() {
      result.time_connect = util.timeToNow(startTime);
    });
  });
  req.end();
}

exports.request = request;
