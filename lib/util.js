'use strict';

exports.timeToNow = function(date) {
  let now = new Date();
  let time = now.getTime() - date.getTime();
  return (time / 1000);
};
