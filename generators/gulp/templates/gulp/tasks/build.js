const gulp = require('gulp');

//
//   Build
//
//////////////////////////////////////////////////////////////////////

/*
Base tasks + tasks that should be run on production
*/

module.exports = gulp.task('build',
  gulp.series(
    'base',
    'images',
    'svg',
    'rev:clear',
    'rev',
    function(done) {
      done();
    }
  )
);
