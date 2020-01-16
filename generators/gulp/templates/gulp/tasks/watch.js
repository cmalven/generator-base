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
  gulp.watch([config.paths.styleSrc + '**/*.scss'], gulp.series('styles', 'styles:lint', 'notify', 'rev:clear'));
  gulp.watch([config.paths.scriptSrc + '**/*.js'], gulp.series(gulp.parallel('scripts:bundle', 'scripts:copy'), 'rev:clear'));<% if (useTwig) { %>
  gulp.watch([config.paths.templateSrc + '**/*.twig'], gulp.series('twig', 'notify'));<% } else { %>
  gulp.watch([config.paths.templateSrc + '**/*.html', config.paths.templateSrc + '**/*.php', config.paths.templateSrc + '**/*.twig'], gulp.series('templates'));
  <% } %>
  gulp.watch([config.paths.imageSrc + '**/*'], gulp.series('images', 'svg', 'reload'));
});
