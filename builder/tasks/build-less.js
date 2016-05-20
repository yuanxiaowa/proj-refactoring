var gulp = require('gulp');

var gif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');

var options = require('../options');
var currentEnv = options.env;

gulp.task('less', function() {
  return gulp.src('src/common/css/lib/bootstrap/bootstrap.less')
    .pipe(gif(currentEnv.dev, sourcemaps.init()))
    .pipe(require('gulp-less')())
    .pipe(gif(currentEnv.dev, sourcemaps.write('.')))
    .pipe(gulp.dest('dest/public/lib/bootstrap/3.3.6/css'));
});