const gulp = require('gulp');
const browserSync = require('browser-sync');
const Stream = require('stream');

const SERVER_NAME = 'yxw';
var hrequest = require('../handler/request');

gulp.task('server', () => {
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
    files: 'dest/**/*',
    // reloadDelay: 1000,
    reloadDebounce: 1200,
    middleware(req, res, next) {
      hrequest(req, res)
        .then(data => {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            Date: new Date().toGMTString(),
            Server: SERVER_NAME
          });
          if (data.pipe) {
            data.pipe(res);
          } else {
            res.end(JSON.stringify(data));
          }
        }, r => {
          if (!r) {
            return next();
          }
          res.writeHead(r, {
            'Content-Type': 'application/json; charset=utf-8',
            Date: new Date().toGMTString(),
            Server: SERVER_NAME
          });
          res.end('{"success":false,"msg":"出错了"}');
        });
    }
  });
});