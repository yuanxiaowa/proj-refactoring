const postcss = require('postcss');

var processors = [
  {
    plugin: require('postcss-partial-import'),
    namespace: 'import',
    defaults: {}
  }, {
    plugin: require('postcss-mixins'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-advanced-variables'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-custom-selectors'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-custom-media'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-custom-properties'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-media-minmax'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-color-function'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-atroot'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-nesting'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-nested'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-property-lookup'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-extend'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-selector-matches'),
    namespace: '',
    defaults: {}
  }, {
    plugin: require('postcss-selector-not'),
    namespace: '',
    defaults: {}
  }
];

module.exports = postcss.plugin('postcss-processor', opts => {
  var instance = postcss();
  processors.forEach(processor => {
    instance.use(processor.plugin());
  });
  return instance;
});