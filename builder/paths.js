var path = require('path');
var fs = require('fs');

var entrance = './src';
var modules = path.join(entrance, 'modules');
var dest = './dest';

var destPublicDir = path.join(dest, 'public');

var commonDir = path.join(entrance, 'common');

var cachesDir = path.join(dest, '.caches');

var files = ['tpl', 'style', 'script', 'image'];

var extensions = {
  tpl: '*.pug',
  style: '*.css',
  script: '*.js',
  image: '*.{png,jpg,gif}'
};

exports = module.exports = {
  output: dest,
  commonDir,
  static: {
    style: path.join(commonDir, 'css/*.css'),
    styleOutput: path.join(destPublicDir, 'css'),
    lib: path.join(commonDir, 'lib/**/*'),
    libOutput: path.join(destPublicDir, 'lib')
  },
  common: {
    tpl: path.join(commonDir, 'tpl'),
    script: path.join(commonDir, 'js'),
    style: path.join(commonDir, 'css'),
    components: path.join(commonDir, 'components')
  },
  outputPublic: destPublicDir,
  cachesDir,
  partials: {
    tpl: path.join(commonDir, 'tpl', 'partials', extensions['tpl']),
    tplOutput: path.join(cachesDir, 'tpl'),
    script: path.join(commonDir, 'script', 'partials', extensions['style']),
    scriptOutput: path.join(cachesDir, 'script')
  },
  rtpl: {
    pattern: /(extends|include)\s+(\/?\w+)/g,
    resolve: function (_, $1, $2) {
      var _name;
      var dir = '';
      if ($2.startsWith('.')) {
        return _;
      }
      if ($1 === 'extends') {
        dir = 'layouts';
      }
      _name = path.relative(
        path.dirname(exports.tpl),
        path.join(commonDir, 'tpl', dir, $2)
      );
      return $1 + ' ' + _name;
    }
  },
  rstyle: {
    pattern: /@import\s+['"](?=\/)/g,
    resolve: function (_) {
      return _ + path.relative(
        path.dirname(exports.style),
        path.join(commonDir, 'css')
      );
    }
  },
  datas: function (file) {
    return new Promise(function (resolve, reject) {
      var _path = file.path;
      var _p = path.dirname(path.dirname(_path));
      var _name = path.basename(_path, '.pug');
      var filepath = path.join(_p, 'data', _name + '.json');
      fs.readFile(
        filepath,
        'utf8',
        function (err, result) {
          if (err) {
            // console.log('enter')
            // console.log(err)
            return resolve({});
          }
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            console.error(filepath, 'json格式不正确');
          }
        })
    });
  },
  rscript: {
    pattern: /(import.*from ')(?=\/)/g,
    resolve: function (_, $1) {
      return _ + path.relative(
        path.join(commonDir, 'js', $1 + '.js')
      );
    }
  },
  rpath: function (file) {
    var d = file.relative.match(/^([\w-]+)\\([\w-]+)/);
    var f = path.join(dest, d[1], d[2] === 'tpl' ? '' : d[2]);
    return f;
  }
};

var fixs = {
  style: 'css',
  script: 'js'
};

var datas;

files.forEach(function (name) {
  var dir = path.join(modules, '*', fixs[name] ? fixs[name] : name);
  exports[name] = path.join(dir, extensions[name]);
  exports[name + 'Dir'] = dir;
  exports[name + 'Base'] = modules;
  exports[name + 'Output'] = dest;
  exports[name + 'All'] = path.join(dir, '*');
});