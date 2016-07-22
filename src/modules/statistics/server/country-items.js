var util = require('./util');

module.exports = () => {
  var ret = {
    total: 100,
    rows: []
  };
  for (let i = 0; i < 10; i++) {
    ret.rows.push({
      name1: i + 1,
      name2: util.getProv(),
      name3: util.getInt(100000),
      name4:util.getInt(100000),
      name5: util.getFloat(10000000),
      name6: util.getInt(100),
      name7: util.getFloat(10000000),
      name8: util.getInt(100),
      name9: util.getFloat(10000000),
      name10: util.getInt(100)
    });
  }
  return ret;
};