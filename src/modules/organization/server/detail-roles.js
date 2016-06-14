module.exports = (params, expm, method) => {
  if ('POST' === method) {
    return;
  }
  let data = {
    left: [],
    right: []
  };
  for (let i = 0; i < 10; i++) {
    data.left.push({
      text: '左边文本' + i,
      value: i
    });
    data.right.push({
      text: '右边文本' + i,
      value: i
    });
  }
  return data;
};