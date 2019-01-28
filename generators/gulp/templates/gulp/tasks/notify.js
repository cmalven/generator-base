const gulp = require('gulp');
const Notifier = require('../utils/notifier')();

//
//   Notify
//
//////////////////////////////////////////////////////////////////////

/*
Broadcasts all queued notifications as in-browser messages
*/

module.exports = gulp.task('notify', function(done) {
  Notifier.notify();
  done();
});
