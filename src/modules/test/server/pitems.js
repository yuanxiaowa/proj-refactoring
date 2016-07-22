module.exports = () => {
  var items = [];
  for (let i = 0, len = 10; i < len; i++) {
    items.push({
      id: i,
      text: 'item' + i
    });
  }
  return items;
};