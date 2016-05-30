var fs = require('fs')

var arr = [];

for (var i = 0; i < 32; i++) {
  arr.push(i + ' ' + i.toString(2));
}

fs.writeFile('a.txt', arr.join('\n'));