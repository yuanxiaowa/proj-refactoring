const pug = require('pug');
var rollup = require('rollup');

const mpath = require('../utils/path');
const mfile = require('../utils/file');
const paths = require('../paths');
const config = require('../config');

const rLib = /\/\/\s+require\(([\w.]+)(?:\s*,\s*(\w+))?\)/g;
const rInclude = /\$\$include\(\'([^\']*)\'\)/g;

// 提取配置
function extractAndReplace(content, settings) {
  content = content.replace(rLib, function(_, $1, $2) {
    settings.js.push(`$\${${$1}}`);
    if ($2) {
      settings.css.push(`$\${${$1}.css}`);
    }
    return '';
  });
  return content;
}

// 导入路径处理
function importReplace(content, path) {
  content = content.replace(
    /(import.*from ')\/([^']*)/g,
    function(_, $1, $2) {
      var dest = mpath.join(paths.common.script, $2);
      var name = $1 + mpath.relative(
        mpath.getDir(path),
        dest
      );
      return mpath.unixizePath(name);
    });
  return content;
}

// 替换处理
function includeHandle(content) {
  var keys = {};
  while (rInclude.test(content)) {
    let k = RegExp.$1;
    keys[RegExp.$_] = k;
  }
  let promises = Object.keys(keys).map(k => {
    return new Promise((resolve, reject) => {
      var filename = mpath.join(paths.common.tpl, `${k}.${config.tpl}`);
      mfile.readFile(filename)
        .then(data => {
          keys[k] = data;
          resolve();
        }, () => {
          reject('');
        });
    });
  });
  return Promise.all(promises)
    .then(() => {
      content = content.replace(rInclude, (_, $1) => {
        return keys[$1];
      });
      return content;
    });
}

// 打包处理
function bundle(content, path, options) {
  var rollupOptions = Object.assign({
    entry: path
  }, options.rollup);
  rollupOptions.plainText = content;
  return rollup.rollup(rollupOptions).then(function(bundle) {
    var res = bundle.generate(options.rollupGen);
    return res.code;
  });
}

module.exports = (context, content, file, options) => {
  return new Promise((resolve, reject) => {
    var settings = { js: [], css: [] };
    var filepath = file.path;
    var filename = mpath.getName(filepath);
    content = extractAndReplace(content, settings);
    // 写入配置
    mfile.writeFile(
      getSameLevelName(filepath, 'setting', config.json),
      settings
    );

    content = importReplace(content, filepath);

    includeHandle(content).then(content => {
      bundle(content, filepath, options).then(resolve, reject);
    });
  });
};
