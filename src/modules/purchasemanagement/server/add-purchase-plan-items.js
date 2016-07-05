module.exports = () => {
  var results = Array(10);
  for (let i = 0; 10 > i; i++) {
    let items = {};
    results[i] = items;
    for (let j = 0; 12 > j; j ++) {
      if (1 === j) {
        items['name' + (j + 1)] = {
          text: '材料编码' + j,
          value: j
        };
      } else if (5 === j) {
        items['name' + (j + 1)] = (new Date).toLocaleDateString();
      } else {
        items['name' + (j + 1)] = (~~(Math.random() * 1000000)).toString(36);
      }
    }
  }
  return results;
};