const config = require('../config');
const gulp = require('gulp');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const pixrem = require('gulp-pixrem');
const postcss = require('gulp-postcss');
const importCss = require('postcss-import');
const cssnano = require('cssnano');

//
//   Styles
//
//////////////////////////////////////////////////////////////////////

/*
Preprocesses stylesheets using the following plugins:

sass: Sass compilation using super-fast libsass
sassGlob: Allows globbing imports in .scss: @import 'styles/modules/*.scss';
cssimport: Allows us to @import .css files in our .scss
pixrem: adds px fallback for all rem values
autoprefixer: Automatically adds vendor prefixes to experimental properties
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
    .pipe(pixrem({ rootValue: '10px' }))
    .pipe(gulp.dest(config.paths.styleDist))
    .pipe(global.browserSync.stream());
});
