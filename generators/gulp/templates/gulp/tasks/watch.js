const config = require('../config');
const gulp = require('gulp');

//
//   Watch
//
//////////////////////////////////////////////////////////////////////

/*
Runs tasks when files change
*/

module.exports = gulp.task('watch', function() {
  gulp.watch([config.paths.styleSrc + '**/*.scss'], function() { gulp.series('styles', 'styles:lint', 'notify', 'rev:clear'); });
  gulp.watch([config.paths.scriptSrc + '**/*.js'], function() { gulp.series(gulp.parallel('scripts:lint', 'scripts:bundle', 'scripts:copy'), 'rev:clear'); });
  gulp.watch([config.paths.templateSrc + '**/*.html', config.paths.templateSrc + '**/*.php', config.paths.templateSrc + '**/*.twig'], function() { gulp.series('templates'); });<% if (useNunjucks) { %>
  gulp.watch([config.paths.templateSrc + '**/*.twig'], function() { gulp.series('nunjucks', 'notify'); });<% } %>
  gulp.watch([config.paths.imageSrc + '**/*'], function() { gulp.series('images', 'svg', 'reload'); });
});
