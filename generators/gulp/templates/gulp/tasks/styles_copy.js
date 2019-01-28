const config = require('../config');
const gulp = require('gulp');

//
//   Styles: Copy
//
//////////////////////////////////////////////////////////////////////

/*
Copies style files from src to dist
*/

module.exports = gulp.task('styles:copy', function(done) {
  const styleSrc = [];

  config.paths.styleCopyPaths.forEach(function(path) {
    styleSrc.push(config.paths.styleSrc + path + '*');
  });

  if (!styleSrc.length) return done();

  return gulp.src(styleSrc)
    .pipe(gulp.dest(config.paths.styleDist));
});
