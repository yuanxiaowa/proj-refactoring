import 'select2';
import 'modalRemote';
import 'bootstrapDatetimepicker';
import 'zTree';
import 'department';
import Linkage from 'linkage';
import formValidation from 'formValidation';
import Choice from 'choice';

var c = new Choice();
c.show();

/*new Linkage({
  url: 'data/items',
  $eles: $('select'),
  id: true,
  initData: [2, 1, 4, 4]
});

formValidation($('form'));

$('[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});*/

/*var defer = $.Deferred();

defer.done(res => {
  console.log(res);
  return '1';
}).done(function() {
  console.log(this === defer.promise());
}).then(res => {
  console.log(res);
}).then(function() {
  console.log(this === defer);
});

defer.resolve('hello');

$.when(1).then(data => {
  console.log('---', data);
});*/

/*$('.dep').department({
  url: 'data/treedatas',
  $hidden: $()
});

function A(...args) {
  console.log(args);
}
A();*/