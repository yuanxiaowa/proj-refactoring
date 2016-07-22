const URL = require('url');
const fs = require('fs');

const mpath = require('../utils/path');
const paths = require('../paths');

var reg = /^\/([^\/]+)\/data\/([\w-]+)/;

module.exports = function(req, res) {
  var url = URL.parse(req.url);
  var pathname = url.pathname;
  var defer = Promise.defer();

  if (reg.test(pathname)) {
    let m = RegExp.$1;
    let name = RegExp.$2;
    let filename = mpath.join(paths.srcModules, m, 'server', name);
    fs.stat(filename + '.json', err => {
      if (err) {
        fs.stat(filename + '.js', err => {
          if (err) {
            return defer.reject(404);
          }
          let h = require(mpath.resolve(filename));
          let method = req.method;
          let expm = {
            success: true,
            msg: ''
          };
          if ('GET' === method) {
            let d = h(getQuery(url.query), expm, method);
            if (undefined !== d) {
              expm.data = d;
            }
            return defer.resolve(expm);
          }
          let arr = [];
          req.on('data', chunk => {
            arr.push(chunk);
          });
          req.on('end', chunk => {
            var data = arr.join('');
            try {
              data = JSON.parse(data);
            } catch(e) {
              data = getQuery(data);
            }
            data = Object.assign(getQuery(url.query), data);
            let d = h(data, expm, method);
            if (undefined !== d) {
              expm.data = d;
            }
            return defer.resolve(expm);
          });
        });
        return;
      }
      let stream = fs.createReadStream(filename + '.json');
      defer.resolve(stream);
    });
  } else {
    defer.reject();
  }
  return defer.promise;
};

const rV = /^([\w-]+)\[\d\]$/;
function getQuery(data) {
  let obj = {};
  if (!data) {
    return obj;
  }
  let arr = data.split('&');
  arr.forEach(item => {
    let _a = item.split('=');
    let key = _a[0];
    let value = _a[1];
    if (rV.test(key)) {
      key = RegExp.$1;
    }
    if (key in obj) {
      if (!(obj[key] instanceof Array)) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
}