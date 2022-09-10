const { images, imagesClean, svg } = require('@malven/gulp-tasks');
const gulp = require('gulp');

//
//   Config
//
//////////////////////////////////////////////////////////////////////

global.GULP_CONFIG = {
  paths: {
    dist: '<%= dist %>/',

    templateSrc: '<%= templateSrc %>',
    templateDist: '<%= templateDist %>',

    imageSrc: '<%= imageSrc %>',
    imageDist: '<%= imageDist %>',
  },
};

// Export tasks

const watch = function(done) {
  // Images
  gulp.watch([
    global.GULP_CONFIG.paths.imageSrc + '**/*',
  ], gulp.series(images, svg));

  done();
};

module.exports = {
  default: gulp.series(
    imagesClean,
    gulp.parallel(
      watch,
      images,
      svg,
    ),
    done => done(),
  ),
  build: gulp.series(
    imagesClean,
    images,
    svg,
    done => done(),
  ),
};
