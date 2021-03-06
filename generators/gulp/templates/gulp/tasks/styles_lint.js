const config = require('../config');
const gulp = require('gulp');
const styleLint = require('gulp-stylelint');

//
//   Styles : Lint
//
//////////////////////////////////////////////////////////////////////

/*
Reviews files for errors and coding consistency
*/

module.exports = gulp.task('styles:lint', function() {
  return gulp
    .src([
      config.paths.styleSrc + '**/*.scss',
      '!' + config.paths.styleSrc + 'vendor/**/*.scss',
      '!' + config.paths.styleSrc + 'vendor-customization/**/*.scss',
    ])
    .pipe(styleLint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    }));
});
