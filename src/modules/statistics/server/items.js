var util = require('./util');

module.exports = (params, expm) => {
  var rows = [];
  var len = params.len ? +params.len : 10;
  var fl = params.fl ? +params.fl : 20;
  for (let i = 0; i < len; i++) {
    let obj = {};
    for (let j = 0, l = fl; j < l; j++) {
      obj['name' + (j + 1)] = util.getFloat(10000000);
    }
    rows.push(obj);
  }
  if (params.nopager) {
    return rows;
  }
  return {
    rows: rows,
    total: 100
  };
};