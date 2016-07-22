import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'jqueryForm2json';

var $table = $('table');

$('[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});

$('form').submit(function() {
  $table.bootstrapTable('refresh', {
    query: $(this).form2json()
  });
  return false;
});

$table.bootstrapTable({
  url: 'data/items',
  method: 'post',
  responseHandler(res) {
    return res.data;
  },
  sidePagination: 'server',
  pagination: true,
  showFooter: true,
  columns: [{
    name: '',
    title: '编号'
  }, {
    name: '',
    title: '所属部门'
  }, {
    name: '',
    title: '工程类别',
    footerFormatter(rows) {
      return '总计';
    }
  }, {
    name: '',
    title: '行业类别',
    footerFormatter(rows) {
      return rows.length;
    }
  }, {
    name: '',
    title: '合同类别'
  }, {
    name: '',
    title: '合同'
  }, {
    name: '',
    title: '项目简称'
  }, {
    name: '',
    title: '总包方'
  }, {
    name: '',
    title: '建设单位'
  }, {
    name: '',
    title: '企业性质'
  }, {
    name: '',
    title: '合同总额(含增补)'
  }, {
    name: '',
    title: '税率'
  }, {
    name: '',
    title: '开工竣工日期'
  }, {
    name: '',
    title: '项目负责人'
  }, {
    name: '',
    title: '施工城市'
  }, {
    name: '',
    title: '区域'
  }, {
    name: '',
    title: '是否归档'
  }]
});