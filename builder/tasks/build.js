const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

const paths = require('../paths');
const options = require('../options');

var currentEnv = options.env;

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
  var tpl = require('./modules/tpl');
  return () => {
    tpl(paths.partials.tpl, paths.partials.tplOutput);
    return tpl(paths.tpl, paths.tplOutput);
  };
}());

gulp.task('script', function() {
  var script = require('./modules/script');
  return () => {
    script(paths.partials.script, paths.partials.tplOutput);
    script(paths.modules.script, paths.modules.scriptOutput);
    return script(paths.script, paths.scriptOutput);
  };
}());

gulp.task('style', function() {
  var style = require('./modules/style');
  return () => {
    return style(paths.style, paths.styleOutput);
  };
}());

gulp.task('build', ['copyStatic', 'script', 'style', 'less'], function() {
  gulp.start(['tpl']);
});

gulp.task('rr', () => {
  gulp.src('src/modules/*/server/*.{js,json}')
    .pipe(require('./modules/a')())
    .pipe(gulp.dest('dest'));
});