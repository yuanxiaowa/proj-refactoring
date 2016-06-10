function getRn(name) {
  return 'n' + escape(name).replace(/%u/g, '').substr(-5);
}

module.exports = {
  getRn
};