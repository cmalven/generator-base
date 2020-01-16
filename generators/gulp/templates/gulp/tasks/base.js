const gulp = require('gulp');

//
//   Base
//
//////////////////////////////////////////////////////////////////////

/*
The baseline tasks to get things going.
*/

module.exports = gulp.task('base',
  gulp.series(
    'clean',
    'rev:clear',
    gulp.parallel(
      'templates',<% if (useTwig) { %>
      'twig',<% } %>
      'scripts:bundle',
      'styles',
      'styles:copy',
      'styles:lint',
      'scripts:copy',
      'copy'
    ),
    function(done) {
      done();
    }
  )
);
