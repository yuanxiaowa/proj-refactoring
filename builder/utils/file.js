const fs = require('fs');
const path = require('./path')

function stat(name) {
  return new Promise((resolve, reject) => {
    if (err) {
      console.error(err);
      return reject(err);
    }
    resolve();
  });
};

function readFile(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, 'utf8', (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

function getJSON(name) {
  return new Promise((resolve, reject) => {
    readFile(name).then(result => {
      resolve(JSON.parse(result));
    }, reject);
  });
}

function writeFile(name, data) {
  return new Promise((resolve, reject) => {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    let dir = path.getDir(name);
    stat(dir)
      .then(null, () => {
        return new Promise((resolve, reject) => {
          fs.mkdir(dir, err => {
            if (err) {
              console.error(err);
              return reject(err);
            }
            resolve();
          });
        });
      })
      .then(() => {
        fs.writeFile(name, data, err => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve();
        });
      }, reject);
  });
}

module.exports = {
  readFile,
  stat,
  getJSON,
  writeFile
};
