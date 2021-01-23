require('dotenv').config();
const config = require('../config');
const gulp = require('gulp');
const twig = require('gulp-twig');
const twigMarkdown = require('twig-markdown');
const htmlmin = require('gulp-htmlmin');

//
//   Twig
//
//////////////////////////////////////////////////////////////////////

/*
Compiles templates using twig
*/

module.exports = gulp.task('twig', function() {
  function swallowError(error) {
    console.log(error.toString()); // eslint-disable-line
    this.emit('end');
  }

  return gulp.src([
    config.paths.templateSrc + '**/[^_]*.twig',
    '!' + config.paths.templateSrc + '**/_*/[^_]*.twig',
    '!' + config.paths.templateSrc + '**/_*/**/[^_]*.twig',
  ])
    .pipe(twig({
      base: config.paths.templateSrc,
      data: {
        env: process.env.NODE_ENV === 'production' ? 'production' : 'dev',
        // Anything defined in `content` will be available in Twig at `{{ content.foo }}`
        // You can also define additional keys that will be available in Twig.
        // For instance, `siteName: 'My Site'` would be available at `{{ siteName }}`
        content: {},
      },
      extend: (Twig) => {
        // Add Markdown support
        twigMarkdown(Twig);
      },
    }))
    .on('error', swallowError)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.paths.templateDist))
    .pipe(global.browserSync.reload({ stream: true, once: true }));
});
