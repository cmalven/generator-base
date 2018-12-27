const gulp = require('gulp');
const runSequence = require('run-sequence');

//
//   Build
//
//////////////////////////////////////////////////////////////////////

/*
Base tasks + tasks that should be run on production
*/

module.exports = gulp.task('build', function(callback) {
  runSequence(
    'base',
    'images',
    'svg',
    'rev:clear',
    'rev',
    callback
  );
});
