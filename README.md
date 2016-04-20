# node-connect-time

[![Build Status](https://travis-ci.org/zyvas/node-connect-time.svg?branch=develop)](https://travis-ci.org/zyvas/node-connect-time)
[![Dependency Status](https://david-dm.org/zyvas/node-connect-time.svg)](https://david-dm.org/zyvas/node-connect-time)
[![devDependency Status](https://david-dm.org/zyvas/node-connect-time/dev-status.svg?style=flat-square)](https://david-dm.org/zyvas/node-connect-time#info=devDependencies)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/38c84326ca9c44df89a9c9e1cbe44bd2)](https://www.codacy.com/app/i_4/node-connect-time)

Make HTTP/HTTPS display information on callback after a completed transfer.

The variables available are:

* `time_namelookup` The time, in seconds, it took from the start until the name resolving was completed.
* `time_appconnect` The time, in seconds, it took from the start until the SSL/SSH/etc connect/handshake to the remote host was completed.
* `time_connect` The time, in seconds, it took from the start until the TCP connect to the remote host (or proxy) was completed.
* `time_pretransfer` The time, in seconds, it took from the start until the file transfer was just about to begin. This includes all pre-transfer commands and negotiations that are specific to the particular protocol(s) involved.
* `time_total` The total time, in seconds, that the full operation lasted. The time will be displayed with millisecond resolution.

## Installation

> $ npm install node-connect-time

## Usage

### request(options[, safe], cb)

`options` can be an object or a string. All options from [http](https://nodejs.org/dist/latest-v5.x/docs/api/http.html#http_http_request_options_callback)/[https](https://nodejs.org/dist/latest-v5.x/docs/api/https.html#https_https_request_options_callback) are valid.

`safe` is specified. it is equivalent to selecting HTTPS. default is false.

example:

```javascript
// http request
var q = require('node-connect-time');
q.request({
  host: 'weibo.com'
}, function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
/**
 * { time_namelookup: 0.012,
 *   time_starttranster: 0,
 *   time_total: 0.036,
 *   time_appconnect: 0,
 *   time_connect: 0.018,
 *   time_starttransfer: 0.032 }
 */

// https request
var q = require('node-connect-time');
q.request({
  host: 'www.baidu.com'
}, true, function(err, data) {
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
