const config = require('../config');
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');

//
//   SVG
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of svg files
*/

var defaultSVGO = [
  { cleanupIDs: false },
  { collapseGroups: false },
  { mergePaths: false },
  { moveElemsAttrsToGroup: false },
  { moveGroupAttrsToElems: false },
  { removeUselessStrokeAndFill: false },
  { removeViewBox: false }
];

module.exports = gulp.task('svg', function(callback) {
  runSequence(
    'svg:clean',
    [
      'svg:icon',
      'svg:full'
    ],
    callback
  );
});

module.exports = gulp.task('svg',
  gulp.series(
    'svg:clean',
    gulp.parallel(
      'svg:icon',
      'svg:full'
    ),
    function(done) {
      done();
    }
  )
);

gulp.task('svg:icon', function() {
  return gulp.src([
    config.paths.imageSrc + 'svg/icon/**/*.svg'
  ])
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: 'icon.symbol.svg'
        },
        inline: true
      },
      shape: {
        id: {
          generator: function(name) {
            return name.replace('.svg', '');
          }
        },
        transform: [
          { svgo: {
            plugins: [
              { removeAttrs: { attrs: ['opacity'] } },
              { convertColors: { currentColor: true } }
            ].concat(defaultSVGO)
          } }
        ]
      }
    }))
    .pipe(gulp.dest(config.paths.templateDist + '_svg/'));
});

gulp.task('svg:full', function() {
  return gulp.src([
    config.paths.imageSrc + 'svg/full/**/*.svg'
  ])
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: 'full.symbol.svg'
        },
        inline: true
      },
      shape: {
        id: {
          generator: function(name) {
            return name.replace('.svg', '');
          }
        },
        transform: [
          { svgo: {
            plugins: [].concat(defaultSVGO)
          } }
        ]
      }
    }))
    .pipe(gulp.dest(config.paths.templateDist + '_svg/'));
});

module.exports = gulp.task('svg:clean', function() {
  return del(config.paths.templateDist + '_svg/');
});
