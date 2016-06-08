var reg = /^c-([\w-]+)/g;
var fs = require('fs');
var path = require('path');
var pug = require('pug');

var paths = require('../paths');
var parser = require('posthtml-parser');

exports = module.exports = function(options) {
  options = options || {};
  return function(tree, cb) {
    var ComImports = [];
    var ComImportsObj = {};
    tree.walk(function(node) {
      // c-开始的标签
      if (reg.test(node.tag)) {
        let name = RegExp.$1;
        if (!ComImportsObj[name]) {
          ComImportsObj[name] = true;
          ComImports.push(new Promise(function(resolve, reject) {
            let dir = path.join(paths.common.components, name);
            fs.readFile(
              path.join(dir, 'index.pug'),
              'utf8',
              function(err, result) {
                if (err) {
                  console.error(err);
                  return;
                }
                var nodes = parser(pug.render(result, {pretty: true}));
                resolve(nodes);
              });
          }));
        }
      }
      return node;
    });
    if (!ComImports.length) {
      cb();
    } else {
      Promise.all(ComImports).then(function(values) {
        var _keys = Object.keys(ComImportsObj);
        datas[options.path.replace(/\\/g, '/')] = _keys;
        tree.walk(function(node) {
          if (reg.test(node.tag)) {
            let name = RegExp.$1;
            let index = _keys.indexOf(name);
            let value = values[index];
            if (value.length > 1) {
              node.tag = 'div';
              node.content = value;
            } else {
              let _node = value[0];
              _node.attrs = Object.assign({}, node.attrs, _node.attrs);
              return _node;
            }
          }
          return node;
        });
        cb();
      });
    }
  };
};

var datas = exports.datas = {};