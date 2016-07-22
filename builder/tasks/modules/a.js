var through = require('through2');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'common-handler';

module.exports = () => {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return callback(null, file);
    }
    var data = {
      success: true
    };
    var path = file.path;
    console.log(path)
    var result = require(path);
    file.path = path.replace(/server([\/|\\][\w-]+)\.js(on)?$/, 'data/$1.json');
    if (typeof result === 'function') {
      data.data = result({}, data);
    } else {
      data = result;
    }
    file.contents = new Buffer(JSON.stringify(data));
    callback(null, file);
  });
};