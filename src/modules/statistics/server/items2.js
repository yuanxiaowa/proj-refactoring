var util = require('./util');

module.exports = () => {
  var r = Math.random();
  var data = [];
  if (0.33 < r) {
    data.push({
      name1: '管材'
    });
  }
  if (0.7 < r) {
    data.push({
      name1: '电线'
    });
  }
  for (let i = 0, len = 7; i < len; i++) {
    data.forEach(item => {
      item['name' + (i + 2)] = util.getFloat(10000000);
    });
  }
  return data;
};