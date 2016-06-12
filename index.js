var rollup = require( 'rollup' );
var fs = require('fs')
rollup.rollup({
  // The bundle's starting point. This file will be
  // included, along with the minimum necessary code
  // from its dependencies
  entry: 'src/modules/organization/js/query.js'
}).then( function ( bundle ) {
  // Generate bundle + sourcemap
  var result = bundle.generate({
    // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
    format: 'cjs'
  });
console.log(result.code)

  /*fs.writeFileSync( 'bundle.js', result.code );

  // Alternatively, let Rollup do it for you
  // (this returns a promise). This is much
  // easier if you're generating a sourcemap
  bundle.write({
    format: 'cjs',
    dest: 'bundle.js'
  });*/
});