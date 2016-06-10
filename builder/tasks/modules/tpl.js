const gulp = require('gulp');
const plumber = require('gulp-plumber');

const options = require('../../options');
const commonHandler = require('../../plugins/common-handler');

module.exports = (src, dest) => {
  return gulp.src(src)
    .pipe(plumber(options.error))
    .pipe(commonHandler({
      type: 'tpl'
    }))
    .pipe(gulp.dest(dest));
};