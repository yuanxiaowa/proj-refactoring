var path = require('path');

var resources = require('./config/resources');

var exts = ['css', 'style', 'js', 'script'];
var fixs = {
  css: 'style',
  js: 'script'
};

var exportsObj = module.exports = {
  baseDir: '../public/lib',
  resolve: function(type) {
    return function(_, $1) {
      var _arr = $1.trim().split('@');
      var version = _arr[1];
      var _type = type;
      var dir = '';
      var _o;
      var arr = _arr[0].split('.');
      var name = arr[0];
      var obj = resources[name];
      // 插件存在
      if (obj) {
        // 置默认版本号
        if (!version) {
          version = obj.cur;
        }
        if (version in obj.files) {
          if (1 < arr.length) {
            if (2 < arr.length) {
              if (!_type) {
                _type = arr.slice(-1)[0];
              }
              _o = arr[1];
            } else {
              if (-1 < exts.indexOf(arr[1])) {
                _type = arr[1];
              } else {
                _o = arr[1];
              }
            }
          }
          dir = path.join(exportsObj.baseDir, arr[0], version);
          if (!_type) {
            _type = 'script';
          }
          if (fixs[_type]) {
            _type = fixs[_type];
          }
          if (!_o) {
            dir = path.join(dir, obj.files[version][_type]);
          } else {
            dir = path.join(dir, obj.files[version]['other'][_o]);
          }
        }
      } else {
        dir = '';
        console.error($1 + '不存在~~~');
      }
      return dir.replace(/\\/g, '/');
    };
  },
  pattern: /\$\${([^}]*)}/g
}
