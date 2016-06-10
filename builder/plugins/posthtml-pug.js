const pug = require('pug');
const parser = require('posthtml-parser');

exports = module.exports = options => {
  options = options || {};
  return (tree, callback) => {
    let fn = pug.compile(tree, options);
    let html = fn(options.locals);
    tree = parser(html);
    callback(null, tree);
  };
};