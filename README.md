# http-metrics

[![Build Status](https://travis-ci.org/zyvas/http-metrics.svg?branch=develop)](https://travis-ci.org/zyvas/http-metrics)
[![Dependency Status](https://david-dm.org/zyvas/http-metrics.svg)](https://david-dm.org/zyvas/http-metrics)
[![devDependency Status](https://david-dm.org/zyvas/http-metrics/dev-status.svg)](https://david-dm.org/zyvas/http-metrics#info=devDependencies)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/fc56dc3fcd894e34bdf8c149fefea2c1)](https://www.codacy.com/app/i_4/http-metrics)

Make HTTP/HTTPS display information on callback after a completed transfer.

The variables available are:

* `time_namelookup` The time, in seconds, it took from the start until the name resolving was completed.
* `time_appconnect` The time, in seconds, it took from the start until the SSL/SSH/etc connect/handshake to the remote host was completed.
* `time_connect` The time, in seconds, it took from the start until the TCP connect to the remote host (or proxy) was completed.
* `time_starttransfer` The time, in seconds, it took from the start until the first byte was just about to be transferred. This includes time_pretransfer and also the time the server needed to calculate the result.
* `time_total` The total time, in seconds, that the full operation lasted. The time will be displayed with millisecond resolution.

## Installation

> $ npm install http-metrics

## Usage

### request(options, cb)

`options` can be an object or a string. All options from [http](https://nodejs.org/dist/latest-v5.x/docs/api/http.html#http_http_request_options_callback)/[https](https://nodejs.org/dist/latest-v5.x/docs/api/https.html#https_https_request_options_callback) are valid.

example:

```javascript
// http request
var q = require('http-metrics');
q.request({
  hostname: 'www.sina.com.cn',
  port: 80,
  path: '/',
  method: 'GET'
}, function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
/**
 * { time_namelookup: 0.012,
 *   time_total: 0.036,
 *   time_appconnect: 0,
 *   time_connect: 0.018,
 *   time_starttransfer: 0.032 }
 */

// https request
var q = require('http-metrics');
q.request('https://www.baidu.com', function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
/**
 * { time_namelookup: 0.021,
 *   time_starttransfer: 0.065,
 *   time_total: 0.067,
 *   time_appconnect: 0.053,
 *   time_connect: 0.032 }
 */
```
