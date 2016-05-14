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
    .pipe(changed(paths.imageOutput))
    .pipe(gulp.dest(paths.imageOutput));
})

gulp.task('tpl', function() {
  var pug = require('gulp-pug');
  var rename = require('gulp-rename');
  return function() {
    return gulpSrc(paths.tpl)
      // .pipe(gif(currentEnv.dev, sourcemaps.init()))
      .pipe(replace(paths.rtpl.pattern, paths.rtpl.resolve))
      .pipe(pug({
        pretty: true
      }))
      .pipe(replace(resources.pattern, resources.resolve()))
      // .pipe(gif(currentEnv.dev, sourcemaps.write('.')))
      .pipe(rename(options.rename))
      .pipe(gulp.dest(paths.tplOutput));
  }
}());

gulp.task('script', function() {
  var babel = require('gulp-babel');
  var uglify = require('gulp-uglify');
  var eslint = require('gulp-eslint');

  return function() {
    return gulpSrc(paths.script)
      .pipe(gif(currentEnv.dev, sourcemaps.init()))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(babel(options.babel))
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
    require('postcss-short'),
    require('stylelint')()
  ];
  if (currentEnv.product) {
    postcssOptions.push(require('cssnano'));
  }

  return function() {
    return gulpSrc(paths.style)
      .pipe(gif(currentEnv.dev, sourcemaps.init()))
      .pipe(postcss(postcssOptions))
      .pipe(replace(resources.pattern, resources.resolve('style')))
      .pipe(gif(currentEnv.dev, sourcemaps.write('.')))
      .pipe(gulp.dest(paths.styleOutput));
  }
}());

gulp.task('build', ['copyStatic', 'style', 'script', 'tpl']);
