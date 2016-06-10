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
  modules: {
    script: path.join(commonDir, 'js', 'modules', extensions['script']),
    scriptOutput: path.join(destPublicDir, 'modules')
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