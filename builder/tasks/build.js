var gulp = require('gulp');

var paths = require('../paths');
var options = require('../options');
var resources = require('../resources');
var currentEnv = options.env;

var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var gif = require('gulp-if');
var replace = require('gulp-replace');

var commonHandler = require('../plugins/common-handler');


function gulpSrc(files) {
  return gulp.src(files)
    .pipe(plumber(options.error));
}

gulp.task('copyStatic', function() {
  gulp.start('image');
  gulpSrc(paths.static.style)
    .pipe(changed(paths.static.styleOutput))
    .pipe(gulp.dest(paths.static.styleOutput));
  gulpSrc(paths.static.lib)
    .pipe(changed(paths.static.libOutput))
    .pipe(gulp.dest(paths.static.libOutput));
});

gulp.task('image', function() {
  gulpSrc(paths.image)
    .pipe(changed(paths.rpath))
    .pipe(gulp.dest(paths.imageOutput));
})

gulp.task('tpl', function() {
  var pug = require('gulp-pug');
  var rename = require('gulp-rename');
  var gdata = require('gulp-data');
  var posthtml = require('gulp-posthtml');
  
  return function() {
    return gulpSrc(paths.tpl)
      .pipe(changed(paths.rpath, {extension: '.html'}))
      .pipe(commonHandler({
        type: 'tpl'
      }))
      .pipe(replace(paths.rtpl.pattern, paths.rtpl.resolve))
      .pipe(gdata(paths.datas))
      .pipe(pug({
        pretty: '  '
      }))
      .pipe(replace(resources.pattern, resources.resolve()))
      .pipe(rename(options.rename))
      .pipe(gulp.dest(paths.tplOutput));
  };
}());

gulp.task('script', function() {
  var babel = require('rollup-plugin-babel');
  var uglify = require('gulp-uglify');
  var eslint = require('gulp-eslint');

  return function() {
    return gulpSrc(paths.script)
      .pipe(changed(paths.rpath))
      .pipe(gif(currentEnv.dev, sourcemaps.init()))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(commonHandler({
        type: 'script',
        rollup: {
          sourceMap: true,
          plugins: [
            babel()
          ]
        },
        rollupGen: {
          format: 'iife'
        }
      }))
      .pipe(replace(resources.pattern, resources.resolve()))
      .pipe(gif(currentEnv.product, uglify()))
      .pipe(gif(currentEnv.dev, sourcemaps.write('.')))
      .pipe(gulp.dest(paths.scriptOutput));
  }
}());

gulp.task('style', function() {
  var postcss = require('gulp-postcss');
  var use = require('postcss-use');
  var sprites = require('postcss-sprites');

  var postcssOptions = [
    require('precss'),
    require('postcss-short')({
      border: {
        disable: false
      },
      color: {},
      'font-size': {},
      position: {},
      size: {},
      spacing: {},
      text: {},
      data: {},
      'font-weight': {}
    }),
    require('rucksack-css')({
      responsiveType: false,
      shorthandPosition: false,
      quantityQueries: true,
      alias: true,
      inputPseudo: true,
      clearFix: true,
      fontPath: true,
      hexRGBA: true,
      easings: true,
      fallbacks: true,
      autoprefixer: false
    })/*,
    require('stylelint')*/
  ];

  if (currentEnv.product) {
    postcssOptions.push(require('cssnano')({
      autoprefixer: false,
      discardComments: {
        removeAll: true
      }
    }));
  }

  return function() {
    return gulpSrc(paths.style)
      .pipe(changed(paths.rpath))
      .pipe(replace(paths.rstyle.pattern, paths.rstyle.resolve))
      .pipe(gif(currentEnv.dev, sourcemaps.init()))
      .pipe(postcss(postcssOptions))
      .pipe(replace(resources.pattern, resources.resolve('style')))
      .pipe(gif(currentEnv.dev, sourcemaps.write('.')))
      .pipe(gulp.dest(paths.styleOutput));
  }
}());

gulp.task('build', ['copyStatic', 'script', 'style', 'less'], function() {
  gulp.start(['tpl']);
});
