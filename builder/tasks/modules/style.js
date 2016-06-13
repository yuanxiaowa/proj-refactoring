const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');

const options = require('../../options');
const commonHandler = require('../../plugins/common-handler');

var currentEnv = options.env;

module.exports = (src, dest) => {
  return gulp.src(src)
    .pipe(plumber(options.error))
    .pipe(gif(currentEnv.dev, sourcemaps.init()))
    .pipe(commonHandler({
      type: 'style'
    }))
    .pipe(gif(currentEnv.dev, sourcemaps.write('.')))
    .pipe(gulp.dest(dest));
};