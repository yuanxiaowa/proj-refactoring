
const rollup = require('rollup');
const CLIEngine = require("eslint").CLIEngine;

const mpath = require('../utils/path');
const mfile = require('../utils/file');
const paths = require('../paths');
const config = require('../config');

let rLib = /\/\/\s+require\(([\w.]+)(?:\s*,\s*(\w+))?\)/g;
let rInclude = /\$\$include\('([^']*)'\)/g;
let rImport = /(import.*from ')\/([^']*)/g;

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
    rImport,
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

function getString(content) {
  return `\`${content}\``;
}

/** 获取引用模板
 * @param  {String} name
 */
function getTpl(name) {
  var filename = mpath.join(paths.partials.tplOutput, `${name}.html`);
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
    entry: path
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
  var types = [, 'warning', 'error'];
  var result = cli.executeOnText(content, filepath).results[0];
  if (result.errorCount || result.warningCount) {
    console.log('eslint: ', filepath)
    result.messages.forEach(item => {
      console.log(`${item.line},${item.column}: ${types[item.severity]}, ${item.ruleId}, ${item.message}, ${item.source}`)
    });
  }
}

function handleFilePath(file) {
  file.base = paths.scriptBase;
}

module.exports = (context, content, file, options) => {
  return new Promise((resolve, reject) => {
    var settings = {
      js: [],
      css: []
    };
    var filepath = file.path;
    var filename = mpath.getName(filepath);
    content = extractAndReplace(content, settings);
    // 写入配置
    mfile.writeFile(
      mpath.getSameLevelName(filepath, 'setting', config.json),
      settings
    );

    content = importReplace(content, filepath);

    includeHandle(content).then(content => {
      // handleFilePath(file);
      bundle(content, filepath, options).then(resolve, reject);
      lint(content, filepath);
    });
  });
};