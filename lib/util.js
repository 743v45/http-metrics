'use strict';

exports.timeToNow = function(date) {
  var now = new Date();
  var time = now.getTime() - date.getTime();
  return (time / 1000);
};
