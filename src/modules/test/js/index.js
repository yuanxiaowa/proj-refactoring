import 'select2';
import 'modalRemote';
import 'bootstrapDatetimepicker';
import Linkage from 'linkage';
import formValidation from 'formValidation';


new Linkage({
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
});