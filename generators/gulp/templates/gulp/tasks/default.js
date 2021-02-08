const gulp = require('gulp');
global.browserSync = require('browser-sync').create();

//
//   Default
//
//////////////////////////////////////////////////////////////////////

/*
Base tasks + local development tasks
*/

module.exports = gulp.task('default',
  gulp.series(
    'base',
    gulp.parallel(
      'browserSync',
      'watch',
      'images',
      'svg'
    ),
    'reload',
    function(done) {
      done();
    }
  )
);
