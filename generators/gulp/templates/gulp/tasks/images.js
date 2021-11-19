const config = require('../config');
const gulp = require('gulp');
const squoosh = require('gulp-libsquoosh');
const changedInPlace = require('gulp-changed-in-place');

//
//   Images
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of image files
*/

module.exports = gulp.task('images', function() {
  return gulp.src([
    config.paths.imageSrc + '**/*.jpg',
    config.paths.imageSrc + '**/*.png',
    config.paths.imageSrc + '**/*.gif',
  ])
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(squoosh())
    .pipe(gulp.dest(config.paths.imageDist));
});
