const fs = require('fs');
const path = require('./path')

function stat(name) {
  return new Promise((resolve, reject) => {
    fs.stat(name, err => {
      if (err) {
        // console.trace(err);
        return reject(err);
      }
      resolve();
    });
  });
};

function readFile(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, 'utf8', (err, result) => {
      if (err) {
        // console.trace(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

function readFile2(name) {
  return readFile(name)
    .then(null, () => '');
}

function getJSON(name) {
  return new Promise((resolve, reject) => {
    readFile(name).then(result => {
      resolve(JSON.parse(result));
    }, reject);
  });
}

function getJSON2(name) {
  return getJSON(name)
    .then(data => data, () => ({}));
}

function writeFile(name, data) {
  return new Promise((resolve, reject) => {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    let dir = path.getDir(name);
    stat(dir)
      .then(null, err => {
        return new Promise((resolve, reject) => {
          fs.mkdir(dir, err => {
            if (err) {
              // console.trace(err);
              return reject(err);
            }
            resolve();
          });
        });
      })
      .then(() => {
        fs.writeFile(name, data, err => {
          if (err) {
            // console.trace(err);
            return reject(err);
          }
          resolve();
        });
      }, reject);
  });
}

module.exports = {
  readFile,
  readFile2,
  stat,
  getJSON,
  getJSON2,
  writeFile
};