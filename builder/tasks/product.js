var gulp = require('gulp');

var runSequence = require('run-sequence');

gulp.task('product', function(callback) {
  runSequence('del', 'build', callback);
});