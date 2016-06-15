const rollup = require('rollup');
const CLIEngine = require('eslint').CLIEngine;
const util = require('gulp-util');

const mpath = require('../utils/path');
const mfile = require('../utils/file');
const paths = require('../paths');
const config = require('../config');

const resources = require('../config/resources');

let rLib = /\/\/\s+require\(([\w.]+)(?:\s*,\s*(\w+))?\)/g;
let rInclude = /\$\$include\('([^']*)'\)/g;
let rImport = /(\bimport\s+(?:\w+\s+from\s+)?')([^']*)/g;

let externals;

function procConfig() {
  var obj = {};
  Object.keys(resources).forEach(item => {
    if (/^(jquery|bootstrap|requirejs|html5shiv|respond)$/.test(item)) {
      return;
    }
    let v = resources[item].cur;
    let o = resources[item].files[v];
    if (o.script) {
      obj[item] = '/' + mpath.join('public/lib', item, v, o.script.replace(/\.js$/, ''));
    }
    if (o.other) {
      for (let k in o.other) {
        if (o.other.hasOwnProperty(k)) {
          let _item = o.other[k];
          obj[item + '.' + k] = '/' + mpath.join('public/lib', item, v, _item.replace(/\.js$/, ''));
        }
      }
    }
  });
  externals = Object.keys(obj);
  mfile.readdir(mpath.join(paths.commonDir, 'js', 'modules'), (err, files) => {
    if (!err) {
      files.forEach(item => {
        let name = mpath.getName(item);
        externals.push(name);
        obj[name] = mpath.join('/public/modules', name);
      });
    }
    mfile.readFile2(mpath.join(paths.common.script, 'config.js'))
      .then(data => {
        let result = JSON.stringify(obj, null, 4);
        result = result.replace(/"/g, `'`)
          .replace(/(?='\/)/g, 'baseUrl + ');
        mfile.writeFile(
          mpath.join(paths.outputPublic, 'config.js'),
          data.replace('$$references', result)
        );
      });
  });
}

procConfig();

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
function importReplace(content, settings) {
  /*content = content.replace(
    rImport,
    function(_, $1, $2) {
      var dest = mpath.join(paths.common.script, $2);
      var name = $1 + mpath.relative(
        mpath.getDir(path),
        dest
      );
      return mpath.unixizePath(name);
    });*/
  content = content.replace(
    rImport,
    function(_, $1, $2) {
      var name = $1;
      if ($2.startsWith('/')) {
        name += `/public${$2}.js`;
      } else {
        let item = resources[$2];
        if (item) {
          let ver = item.cur;
          let o = item.files[ver];
          if (o.style) {
            settings.css.push(`$\${${$2}.css}`);
          }
        }
        name += $2;
      }
      return mpath.unixizePath(name);
    }
  );
  return content;
}

function getString(content) {
  return `\`${content}\``;
}

/** 获取引用模板
 * @param  {String} name
 */
function getTpl(name) {
  var filename = mpath.join(paths.partials.tplOutput, `${mpath.getName(name)}.html`);
  return mfile.readFile2(filename);
}

/**
 * 替换处理
 * @param  {String} content
 */
function includeHandle(content) {
  var keys = {};
  while (rInclude.test(content)) {
    let k = RegExp.$1;
    keys[k] = true;
  }
  let promises = Object.keys(keys).map(k => {
    return new Promise((resolve, reject) => {
      getTpl(k).then(value => {
        keys[k] = value;
        resolve();
      });
    });
  });
  return Promise.all(promises)
    .then(() => {
      content = content.replace(rInclude, (_, $1) => {
        return getString(keys[$1]);
      });
      return content;
    });
}
/**
 * 打包处理
 * @param  {String} content
 * @param  {String} path
 * @param  {String} options
 */
function bundle(content, path, options) {
  var rollupOptions = Object.assign({
    entry: path,
    external: externals
  }, options.rollup);
  rollupOptions.plainText = content;
  return rollup.rollup(rollupOptions).then(function(bundle) {
    var res = bundle.generate(options.rollupGen);
    return res.code;
  });
}
/**
 * 语法校验
 * @param  {String} content
 * @param  {String} filepath
 */
function lint(content, filepath) {
  var cli = new CLIEngine({
    useEslintrc: true
  });
  var types = [, util.colors.yellow('warning'), util.colors.red('error')];
  var result = cli.executeOnText(content, filepath).results[0];
  if (result.errorCount || result.warningCount) {
    util.log(util.colors.bgBlue('代码检查：'), filepath);
    result.messages.forEach(item => {
      console.log(
        types[item.severity],
        util.colors.cyan(`${item.line},${item.column}`),
        util.colors.magenta('规则'),
        `${item.ruleId}`,
        util.colors.magenta('信息'),
        `${item.message}`,
        util.colors.magenta('源码片段'),
        `${item.source}`
      );
      // util.log(`${item.line},${item.column}: ${types[item.severity]}, ${item.ruleId}, ${item.message}, ${item.source}`)
    });
  }
}

function handleFilePath(file) {
  file.base = paths.scriptBase;
}

module.exports = (context, content, file, options) => {
  return new Promise((resolve, reject) => {
    var filepath = file.path;
    var settings = {
      js: [],
      css: []
    };
    content = extractAndReplace(content, settings);
    content = importReplace(content, settings);

    if (!mpath.contains(paths.commonDir, filepath)) {
      // settings.js.push(mpath.getName(filepath));
      // 写入配置
      mfile.writeFile(
        mpath.getSameLevelName(filepath, 'setting', config.json),
        settings
      );
    }

    includeHandle(content).then(content => {
      if (!mpath.contains(paths.commonDir, filepath)) {
        handleFilePath(file);
      }
      bundle(content, filepath, options).then(resolve, reject);
      if (!mpath.contains(paths.commonDir, filepath)) {
        lint(content, filepath);
      }
    });
  });
};