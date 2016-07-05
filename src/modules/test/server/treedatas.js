module.exports = () => {
  return [{
    name: 'test1',
    open: true,
    children: [{
      name: 'test1_1',
      id: 1
    }, {
      name: 'test1_2',
      id: 2
    }]
  }, {
    name: 'test2',
    open: true,
    children: [{
      name: 'test2_1'
    }, {
      name: 'test2_2'
    }]
  }];
};