module.exports = (params, expm) => {
  if (!('admin' === params.username && '123' === params.password)) {
    expm.success = false;
    expm.msg = '用户名或密码错误';
  }
};