var gulp = require('gulp');

var paths = require('../paths');

var path = require('path');

var tpl = require('./modules/tpl');
var script = require('./modules/script');
var style = require('./modules/style');

gulp.task('watch', function() {
  gulp.watch(paths.tplAll, handler(tpl, paths.tplOutput));
  gulp.watch(paths.partials.tpl, handler(tpl, paths.partials.tplOutput));

  gulp.watch(paths.scriptAll, handler(script, paths.scriptOutput));
  gulp.watch(paths.partials.script, handler(script, paths.partials.scriptOutput));
  gulp.watch(paths.modules.script, handler(script, paths.modules.scriptOutput));

  gulp.watch(paths.styleAll, handler(style, paths.styleOutput));
  gulp.watch(paths.imageAll, ['image']);
  gulp.watch('src/common/css/lib/bootstrap/**/*', ['less']);
});

function handler(h, d) {
  return e => {
    console.log(e);
    if (e.type === 'changed' || e.type === 'added') {
      h(e.path, d);
    }
  };
}