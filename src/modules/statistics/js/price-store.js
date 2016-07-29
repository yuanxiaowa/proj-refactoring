import 'bootstrapTable';
import 'jqueryForm2json';
import 'bootstrapDatetimepicker';

var $table = $('table');

$('input[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});

$table.bootstrapTable({
  url: 'data/items',
  method: 'post',
  sidePagination: 'server',
  pagination: true,
  responseHandler(res) {
    return res.data;
  },
  columns: [{
    field: 'name1',
    title: '编号'
  }, {
    field: 'name2',
    title: '所属部门'
  }, {
    field: 'name3',
    title: '所属项目'
  }, {
    field: 'name4',
    title: '材料合同'
  }, {
    field: 'name5',
    title: '材料名称'
  }, {
    field: 'name6',
    title: '规格型号'
  }, {
    field: 'name7',
    title: '单位'
  }, {
    field: 'name8',
    title: '单价'
  }, {
    field: 'name9',
    title: '供应商'
  }, {
    field: 'name10',
    title: '地区'
  }, {
    field: 'name11',
    title: '采购日期'
  }]
});

$('form').submit(function() {
  $table.bootstrapTable('refresh', {
    query: $(this).form2json()
  });
  return false;
});