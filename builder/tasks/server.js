var gulp = require('gulp');
var URL = require('url');

var browserSync = require('browser-sync');

gulp.task('server', function() {
  browserSync({
    open: false,
    port: 8080,
    server: {
      baseDir: 'dest',
      files: '**/*',
      routes: {
        // '/Public': 'Public'
      }
    },
    middleware: function(req, res, next) {
      var url = URL.parse(req.url).pathname;

      next();
    }
  });
});
