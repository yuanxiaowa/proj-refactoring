var path = require('path');

var entrance = './src';
var modules = path.join(entrance, 'modules');
var dest = './dest';

var destPublicDir = path.join(dest, 'public');

var commonDir = path.join(entrance, 'common');

var files = ['tpl', 'style', 'script', 'image'];

var extensions = {
  tpl: '*.pug',
  style: '*.css',
  script: '*.js',
  image: '*.{png,jpg,gif}'
};

var exportsObj = module.exports = {
  output: dest,
  static: {
    style: path.join(commonDir, '**/*.css'),
    styleOutput: destPublicDir,
    lib: path.join(commonDir, 'lib/**/*'),
    libOutput: path.join(destPublicDir, 'lib')
  },
  outputPublic: destPublicDir,
  rtpl: {
    pattern: /(extends|include)\s+(\/?\w+)/g,
    resolve: function(_, $1, $2) {
      var _name;
      var dir = '';
      if ($2.startsWith('.')) {
        return _;
      }
      if ($1 === 'extends') {
        dir = 'layouts';
      }
      _name = path.relative(
        path.dirname(exportsObj.tpl),
        path.join(commonDir, 'tpl', dir, $2)
      );
      return $1 + ' ' + _name;
    }
  }
};

var fixs = {
  style: 'css',
  script: 'js'
};

files.forEach(function(name) {
  var dir = path.join(modules, '*', fixs[name] ? fixs[name] : name);
  exportsObj[name] = path.join(dir, extensions[name]);
  exportsObj[name + 'Dir'] = dir;
  exportsObj[name + 'Output'] = dest;
  exportsObj[name + 'All'] = path.join(dir, '*');
});