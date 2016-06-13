const path = require('path');

const rExt = /\.(\w+)$/;

/**
 * 获取完整文件名
 * @param  {String} name 路径
 * @return {String}
 */
function getFullName(name) {
  return path.basename(name);
}

/**
 * 获取文件名
 * @param  {String} name 路径
 * @return {String}
 */
function getName(name) {
  return getFullName(name).replace(rExt, '');
}

/**
 * 获取文件夹
 * @param  {String} name 路径
 * @return {String}
 */
function getDir(name) {
  return path.dirname(name);
}

/**
 * 获取父文件夹
 * @param  {String} name 路径
 * @return {String}
 */
function getParentDir(name) {
  return getDir(getDir(name));
}

/**
 * 获取父文件夹名
 * @param  {String} name 路径
 * @return {String}
 */
function getParentName(name) {
  return getName(getDir(name));
}

/**
 * 获取同水平的另一文件夹的相同名字的文件路径
 * @param  {String} name 路径
 * @param  {String} dir  文件夹名
 * @param  {String} type 类型
 * @return {String}
 */
function getSameLevelName(name, dir, type) {
  let _name = getName(name);
  return join(getParentDir(name), dir, `${_name}.${type}`);
}

/**
 * 获取后缀名
 * @param  {String} name 路径
 * @return {String}
 */
function getExtName(name) {
  return name.match(rExt)[1];
}

/**
 * 获取unix风格的路径
 * @param  {String} name 路径
 * @return {String}
 */
function unixizePath(name) {
  return name.replace(/\\/g, '/');
}

function contains(src, dest) {
  src = path.resolve(src);
  dest = path.resolve(dest);
  return dest.startsWith(src);
}

function getFileNameRel(src, rel) {
  src = path.resolve(src);
  rel = path.resolve(rel) + '\\';
  return unixizePath(src.replace(rel, ''));
}

function getSp(src) {
  return join(getParentDir(src), getFullName(src));
}

function changeExt(src, ext) {
  return src.replace(/\.\w+$/, `.${ext}`);
}

function join(...items) {
  return unixizePath(path.join(...items));
}

function relative(a, b) {
  return unixizePath(path.relative(a, b));
}

module.exports = {
  getFullName,
  getName,
  getDir,
  getParentDir,
  getParentName,
  getSameLevelName,
  getExtName,
  unixizePath,
  join,
  relative,
  contains,
  getFileNameRel,
  getSp,
  changeExt,
  resolve: path.resolve
};