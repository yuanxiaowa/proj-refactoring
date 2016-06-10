var gutil = require('gulp-util');
var path = require('path');

module.exports = {
  error: {
    errorHandler: function (msg) {
      gutil.log(msg)
    }
  },
  babel: {
    presets: ['es2015-rollup']
  },
  eslint: {
    extends: 'eslint:recommended'
  },
  stylelint: {

  },
  env: {
    product: false,
    dev: true
  }
}
