const posthtml = require('posthtml');

const mpath = require('../utils/path');
const mfile = require('../utils/file');
const resources = require('../resources');
const paths = require('../paths');
const config = require('../config');
const tpl = require('../plugins/posthtml-pug');


const rExternal = /(extends|include)\s+(\/?\w+)/g;


/**
 * 修复外部扩展
 * @param  {String} content
 */
function fixExternal(content) {
  content = content.replace(rExternal, (_, $1, $2) => {
    if ($2.startsWith('.')) {
      return _;
    }
    let dir = '';
    if ($1 === 'extends') {
      dir = 'layouts';
    }
    let _name = mpath.relative(
      mpath.getDir(paths.tpl),
      mpath.join(paths.commonDir, 'tpl', dir, $2)
    );
    return $1 + ' ' + mpath.unixizePath(_name);
  });
  return content;
}

/**
 * 获取配置
 * @param  {String} filepath 路径
 */
function getSetting(filepath) {
  var filesetting = mpath.join(
    mpath.getSameLevelName(filepath, 'setting', config.json)
  );
  return mfile.getJSON(filesetting);
}

/**
 * 处理孤立文件
 * @param  {String} content 内容
 * @param  {String} filename 文件名
 */
function handleLone(content, filename) {
  if (filename.startsWith('_')) {
    content = 'include /mixins/mixin-main\n' + content;
  }
  return content;
}

function changeExtension(filepath) {
  return filepath.replace(/\.\w+$/, '.html');
}

function getData(filepath) {
  return mfile.getJSON2(mpath.getSameLevelName(filepath, 'data', 'json'));
}

function handlePartials(content, filepath) {
  let result = require('pug').render(
    `include ../mixins/mixin-main\n${content}`, {
      filename: filepath
    }
  );
  return result;
}

function handleFilePath(file) {
  var base = file.base;
  if (mpath.contains(paths.commonDir, base)) {
    file.base = paths.common.tpl;
  } else {
    file.base = paths.tplBase;
  }
}

module.exports = (context, content, file) => {
  var filepath = file.path;
  return new Promise((resolve, reject) => {
    let defer = Promise.defer();
    handleFilePath(file);
    if (mpath.getParentName(filepath) === 'partials') {
      defer.resolve(handlePartials(content, filepath));
    } else {
      getSetting(filepath)
        .then(data => {
          if (data.js.length) {
            content = content.replace(/(?=append content)/, function() {
              var str = 'append script\n  +script(\'' + data.js.join('\',\'') + '\')';
              if (data.css.length) {
                str += '\nappend style\n  +style(\'' + data.css.join('\',\'') + '\')';
              }
              return str + '\n';
            });
          }
          return content;
        }, () => {
          return content;
        })
        .then(result => {
          content = result;
          return getData(filepath);
        })
        .then(data => {
          let defer = Promise.defer();
          posthtml([tpl({
              filename: filepath,
              pretty: '  ',
              locals: data,
              // debug: true
            })])
            .process(content)
            .then(result => {
              defer.resolve(result.html);
            }, defer.reject);
          return defer.promise;
        })
        .then(result => {
          filepath = mpath.getSp(filepath);
          result = result.replace(resources.pattern, resources.resolve());
          defer.resolve(result);
        });
    }

    content = handleLone(content, mpath.getName(filepath));
    content = fixExternal(content);

    defer.promise
      .then(content => {
        file.path = mpath.changeExt(filepath, 'html');
        return content;
      })
      .then(resolve, reject);
  });
};