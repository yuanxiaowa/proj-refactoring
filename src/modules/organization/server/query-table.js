module.exports = (params, expm) => {
  let data = {
    total: 200,
    rows: []
  };
  for (let i = 0; i < 10; i++) {
    data.rows.push({
      id: ~~(Math.random() * 10000),
      username: 'filed' + i,
      gendar: Math.random() > .5 ? '男' : '女',
      num: ~~(Math.random() * 10000),
      department: 'department' + i,
      duty: '职务' + i,
      position: '职位' + i,
      isActivate: '是',
      isFb: '是'
    });
  }
  return data;
};