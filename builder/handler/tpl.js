module.exports = (context, content, file) => {
  return new Promise((resolve, reject) => {

    var filename = path.basename(src, '.pug');
    var filesetting = path.join(
      path.dirname(path.dirname(file.path)),
      'setting',
      filename + '.json'
    );
    if (filename.startsWith('_')) {
      content = 'include /mixins/mixin-main\n' + content;
    }
    fs.readFile(filesetting, 'utf8', function(err, result) {
      if (err) {
        // gutil.log(err)
        return cb();
      }
      var data = JSON.parse(result);
      if (data.js.length) {
        content = content.replace(/(?=append content)/, function() {
          var str = 'append script\n  +script(\'' + data.js.join('\',\'') + '\')';
          if (data.css.length) {
            str += '\nappend style\n  +style(\'' + data.css.join('\',\'') + '\')';
          }
          return str + '\n';
        });
        cb();
      }
    });
    /*posthtml([
      components({path: file.path})
      ])
      .process(content)
      .then(function(result) {
        content = result.html;
        cb();
      });*/
    return;
    
  });
};