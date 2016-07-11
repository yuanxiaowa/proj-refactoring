module.exports = () => {
  var rows = getRows(10, 8);
  return {
    rows,
    total: 100
  };
};

function getRows(rn, cn) {
  var rows = [];
  for (let i = 0; i < rn; i++) {
    let obj = {};
    rows.push(obj);
    for (let j = 0; j < cn; j ++) {
      obj[`field${j}`] = ((Math.random() * Math.pow(2, 30)) >> 0).toString(36);
    }
  }
  return rows;
}