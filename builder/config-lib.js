const path = require('path');
const fs = require('fs');
const mfile = require('./utils/file');
const spawn = require('child_process').spawn;

let args = process.argv.slice(2);

let b = true;

args = args.filter(item => {
  if ('-r' === item) {
    return b = false;
  }
  return true;
});

let sargs = args.slice();

if (b) {
  sargs.unshift('install');
} else {
  sargs.unshift('uninstall');
}
if (1 < sargs.length) {
  sargs.push('--save-dev');
}

const cnpm = spawn(
  'win32' === process.platform ? 'cnpm.cmd' : 'cnpm',
  sargs, {
    stdio: 'inherit'
  }
);

cnpm.on('exit', code => {
  if (0 === code) {
    // setConf();
  }
});

args = args.map(item => {
  return item.replace(/@.*/, '');
});

function setConf() {
  mfile.getJSON2('package.json')
    .then(result => {
      let res = {};
      let devs = JSON.parse(result).devDependencies;
      let versions = args.forEach(item => {
        res[item] = {
          cur: devs[item].replace(/^[^\d]/, '')
        };
      });
      return res;
    })
    .then(result => {
      args.forEach(item => {
        let dir = fs.join('node_modules', 'item');
      });
    });
}