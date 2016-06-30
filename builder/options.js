var gutil = require('gulp-util');

module.exports = {
  error: {
    errorHandler: function (msg) {
      gutil.log(msg);
    }
  },
  env: {
    product: false,
    dev: true
  }
};