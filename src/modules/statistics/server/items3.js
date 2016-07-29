var util = require('./util');

module.exports = () => {
  var data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      name1: util.getProv(),
      name2: util.getInt(100000),
      name3: util.getFloat(10000000)
    });
  }
  return data;
};