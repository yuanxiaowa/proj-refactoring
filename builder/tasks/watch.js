var gulp = require('gulp');

var paths = require('../paths');

gulp.task('watch', function() {
  gulp.watch(paths.tplAll, ['tpl']);
  gulp.watch(paths.scriptAll, ['script']);
  gulp.watch(paths.styleAll, ['style']);
  gulp.watch(paths.imageAll, ['image'])
  gulp.watch('src/common/css/lib/bootstrap/**/*', ['less']);
});
