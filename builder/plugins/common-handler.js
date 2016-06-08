var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
// var posthtml = require('posthtml');
var fs = require('fs');

var resources = require('../resources');
var paths = require('../paths');


var PLUGIN_NAME = 'common-handler';

var getHandler = (() => {
  var scriptHandler = require('../handler/script');
  var tplHandler = require('../handler/tpl');
  return type => {
    if (type == 'script') {
      return scriptHandler;
    } else if (type == 'tpl') {
      return tplHandler;
    }
  };
})();

module.exports = function(_options) {
  var options = Object.assign({
    type: 'script'
  }, _options);
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return callback(null, file);
    }
    var self = this;
    var content = file.contents.toString();
    var src = file.path;
    var handler = getHandler(options.type);

    handler(this, content, file, options)
      .then(null, () => {

      })
      .then(content => {
        file.contents = new Buffer(content);
        self.push(file);
        callback();
      });

    callback(null, file);
  });
};