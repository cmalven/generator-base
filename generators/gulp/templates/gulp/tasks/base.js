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
      'templates',<% if (useNunjucks) { %>
      'nunjucks',<% } %>
      'scripts:bundle',
      'scripts:lint',
      'styles',
      'styles:copy',
      'styles:lint',
      'scripts:copy'
    ),
    function(done) {
      done();
    }
  )
);
