const postcss = require('postcss');
const gutil = require('gulp-util');
const applySourceMap = require('vinyl-sourcemaps-apply');

const paths = require('../paths');
const mpath = require('../utils/path');
// const processor = require('../plugins/postcss-processor');

const rImport = /@import\s+['"](?=\/)/g;

var processors = (function() {
  var arr = [
    require('precss'),
    require('postcss-color-gray'),
    require('postcss-color-hex-alpha'),
    require('postcss-calc'),
    require('postcss-short')({
      border: {
        disable: false
      }
    }),
    require('postcss-quantity-queries'),
    require('postcss-alias'),
    require('postcss-input-style'),
    require('postcss-hexrgba'),
    require('postcss-easings'),
    require('postcss-opacity'),
    require('postcss-color-rgba-fallback'),
    require('postcss-filter-gradient'),
    require('postcss-pseudoelements'),
    require('postcss-vmin'),
    require('postcss-will-change'),
    require('autoprefixer'),
    require('pixrem')
    // require('stylelint')
  ];

  if (require('../options').env.product) {
    arr.push(
      require('cssnano')({
        autoprefixer: false,
        discardComments: {
          removeAll: true
        }
      })
    );
  }
  return arr;
})();

function fixPath(content) {
  content = content.replace(
    rImport,
    _ => {
      return _ + mpath.relative(
        mpath.getDir(paths.style),
        mpath.join(paths.commonDir, 'css')
      );
    }
  );
  return mpath.unixizePath(content);
}

function handleFilePath(file) {
  file.base = paths.styleBase;
}

module.exports = (context, content, file, options) => {
  return new Promise((resolve, reject) => {
    content = fixPath(content);
    let opts = {
      from: file.path,
      to: file.path,
      map: false
    };
    if (file.sourceMap) {
      opts.map = {
        annotation: false
      };
    }
    postcss(processors)
      .process(content, opts)
      .then(result => {
        let warnings = result.warnings().join('\n');
        if (file.sourceMap) {
          try {
            let map = result.map.toJSON();
            map.file = file.relative;
            map.sources = [].map.call(map.sources, source => {
              return mpath.join(mpath.getDir(file.relative), source);
            });
            applySourceMap(file, map);
          } catch (e) {
            console.log(e);
          }
        }
        if (warnings) {
          gutil.log('postcss: ', file.relative + '\n' + warnings);
        }
        handleFilePath(file);
        resolve(result.css);
      }, reject);
  });
};