const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gif = require('gulp-if');

const options = require('../../options');
const commonHandler = require('../../plugins/common-handler');

var currentEnv = options.env;

module.exports = (src, dest) => {
  return gulp.src(src)
    .pipe(plumber(options.error))
    .pipe(gif(currentEnv.dev, sourcemaps.init()))
    .pipe(commonHandler({
      type: 'script',
      rollup: {
        sourceMap: true,
        plugins: [
          require('rollup-plugin-babel')()
        ]
      },
      rollupGen: {
        format: 'amd'
      }
    }))
    .pipe(gif(currentEnv.product, uglify()))
    .pipe(gif(currentEnv.dev, sourcemaps.write('.')))
    .pipe(gulp.dest(dest));
};