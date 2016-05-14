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
  d3: {
    cur: '3.5.17',
    files: {
      '3.5.17': {
        script: 'd3.js'
      }
    }
  },
  bootstrapValidator: {
    cur: '0.5.3',
    files: {
      '0.5.3': {
        script: 'js/bootstrapValidator.js'
      }
    }
  }
};

var exportsObj = module.exports = {
  baseDir: '/public/lib',
  resolve: function(type) {
    return function(_, $1) {
      var arr = $1.trim().split('@');
      var version = arr[1];
      var _type = type;
      var obj;

      arr = arr[0].split('.');
      obj = resources[arr[0]];

      if (obj) {
        if (!version) {
          version = obj.cur;
        }
        if (!_type) {
          _type = arr[1];
          if (!_type) {
            _type = 'script';
          } else if (_type === 'css') {
            _type = 'style';
          }
        }
        if (obj.files[version][_type]) {
          return path.join(exportsObj.baseDir, arr[0], version, obj.files[version][_type]).replace(/\\/g, '/');
        }
      }
      console.error($1 + '不存在~~~')
      return '';
    }
  },
  pattern: /\$\${([^}]*)}/g
}
