var items = ['房屋建筑', '化工石油', '矿山工程', '矿山工程'];

module.exports = () => {
  var ret = [];
  for (let i = 0; i < items.length; i++) {
    let r1 = +(Math.random() * 10000000).toFixed(2);
    let r2 = +(Math.random() * 10000000).toFixed(2);
    ret.push({
      name1: i + 1,
      name2: items[i],
      name3: r1,
      name4: r2
    });
  } 
  return ret;
};