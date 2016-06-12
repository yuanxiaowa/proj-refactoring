const fs = require('fs');
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
if (sargs.length > 1) {
  sargs.push('--save-dev');
}

const cnpm = spawn(
  process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm',
  sargs, {
    stdio: 'inherit'
  }
);

cnpm.on('exit', code => {
  if (0 === code) {
    fs.readFile(
      'package.json',
      'utf8',
      (err, result) => {
        if (err) {
          return console.log(err);
        }
        let devs = JSON.parse(result).devDependencies;
        let versions = args.map(item => {
          return devs[item].replace(/^[^\d]/, '');
        });
      }
    );
  }
});