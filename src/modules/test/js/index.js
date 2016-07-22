import 'select2';
import 'modalRemote';
import 'bootstrapDatetimepicker';
import 'zTree';
import 'department';
import Linkage from 'linkage';
import formValidation from 'formValidation';
import Choice from 'choice';
import 'areaList';

var c = new Choice({
  url: '../statistics/data/country-items',
  type: 3,
  tplUrl: '_choice-material.html',
  onSelected(a) {
    console.log(a);
  },
  onInited($form) {
    $form.find('input').first().areaList({
      url: 'data/pitems',
      onOk(results) {
        console.log(results);
      }
    });
  }
});
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
});*/

/*function A(...args) {
  console.log(args);
}
A();*/

$('.dep').areaList({
    url: 'data/pitems',
    id: 1233,
    initData: [1, 2, 3],
    onOk(results) {
        console.log(results);
    }
});