var path = require('path');

var resources = {
  jquery: {
    cur: '2.2.3',
    files: {
      '2.2.3': {
        script: 'jquery.js'
      },
      '1.12.3': {
        script: 'jquery.js'
      }
    }
  },
  bootstrap: {
    cur: '3.3.6',
    files: {
      '3.3.6': {
        script: 'js/bootstrap.js',
        style: 'css/bootstrap.css'
      }
    }
  },
  bootstrapTable: {
    cur: '1.10.1',
    files: {
      '1.10.1': {
        script: 'js/bootstrap-table.js',
        style: 'css/bootstrap-table.css'
      }
    }
  },
  bootstrapTreeview: {
    cur: '1.2.0',
    files: {
      '1.2.0': {
        script: 'js/bootstrap-treeview.js',
        style: 'css/bootstrap-treeview.css'
      }
    }
  },
  d3: {
    cur: '3.5.17',
    files: {
      '3.5.17': {
        script: 'd3.js'
      }
    }
  },
  echarts: {
    cur: '3.1.9',
    files: {
      '3.1.9': {
        script: 'echarts.js',
        other: {
          bmap: 'bmap.js',
          china: 'china.js'
        }
      }
    }
  },
  jqBootstrapValidation: {
    cur: '1.3.6',
    files: {
      '1.3.6': {
        script: 'jqBootstrapValidation.js'
      }
    }
  },
  jqueryValidate: {
    cur: '1.15.0',
    files: {
      '1.15.0': {
        script: 'jquery.validate.js'
      }
    }
  },
  fontAwesome: {
    cur: '3.2.1',
    files: {
      '3.2.1': {
        style: 'css/font-awesome.css'
      }
    }
  },
  html5shiv: {
    cur: '3.7.3',
    files: {
      '3.7.3': {
        script: 'html5shiv.js'
      }
    }
  },
  respond: {
    cur: '1.4.2',
    files: {
      '1.4.2': {
        script: 'respond.js'
      }
    }
  }
};

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
          if (arr.length > 1) {
            if (arr.length > 2) {
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
    }
  },
  pattern: /\$\${([^}]*)}/g
}
