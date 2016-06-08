var gutil = require('gulp-util');
var path = require('path');

module.exports = {
  error: {
    errorHandler: function(msg) {
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
  rename: function(_path) {
    _path.dirname = path.dirname(_path.dirname);
  },
  env: {
    product: false,
    dev: true
  }
}
