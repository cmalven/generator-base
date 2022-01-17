const config = require('../config');
const gulp = require('gulp');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const importCss = require('postcss-import');
const cssnano = require('cssnano');

//
//   Styles
//
//////////////////////////////////////////////////////////////////////

/*
Preprocesses stylesheets using Sass + PostCSS.
*/

module.exports = gulp.task('styles', function() {
  const postCssProcessors = [
    importCss(),
    autoprefixer(),
    cssnano(),
  ];

  return gulp.src([
    config.paths.styleSrc + 'main.scss',
  ])
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./node_modules'],
    }).on('error', function(error) {
      sass.logError.call(this, error);
    }))
    .pipe(postcss(postCssProcessors, {}))
    .pipe(gulp.dest(config.paths.styleDist))
    .pipe(global.browserSync.stream());
});
