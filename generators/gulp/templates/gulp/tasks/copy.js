const config = require('../config');
const gulp = require('gulp');

//
//   Copy
//
//////////////////////////////////////////////////////////////////////

/*
Copies additional files to dist
*/

module.exports = gulp.task('copy', function(done) {
  const src = [];

  if (!config.paths.distCopyPaths.length) return done();

  config.paths.distCopyPaths.forEach(function(path) {
    src.push(path + '**/*');
  });

  return gulp.src(src)
    .pipe(gulp.dest(config.paths.dist));
});
