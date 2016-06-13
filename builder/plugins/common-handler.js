var through = require('through2');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'common-handler';

var getHandler = (() => {
  var scriptHandler = require('../handler/script');
  var tplHandler = require('../handler/tpl');
  var styleHandler = require('../handler/style');
  return type => {
    if (type == 'script') {
      return scriptHandler;
    } else if (type == 'tpl') {
      return tplHandler;
    } else if (type == 'style') {
      return styleHandler;
    }
  };
})();

module.exports = _options => {
  var options = Object.assign({
    type: 'script'
  }, _options);
  return through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return callback(null, file);
    }
    var content = file.contents.toString();
    var handler = getHandler(options.type);

    if (!handler) {
      return callback(null, file);
    }
    handler(this, content, file, options)
      .then(null, gutil.log)
      .then(content => {
        file.contents = new Buffer(content);
        this.push(file);
        callback();
      });
  });
};