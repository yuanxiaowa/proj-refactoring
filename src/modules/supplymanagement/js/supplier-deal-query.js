import 'bootstrapTable';
import 'bootstrapDatetimepicker';

$('table')
  .bootstrapTable({
    url: '',
    sidePagination: 'server',
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      title: '编号',
      field: ''
    }, {
      title: '订单号',
      field: ''
    }, {
      title: '订单名称',
      field: ''
    }, {
      title: '所属部门',
      field: ''
    }, {
      title: '所属项目',
      field: ''
    }, {
      title: '成交时间',
      field: ''
    }, {
      title: '发货时间',
      field: ''
    }, {
      title: '交易金额',
      field: ''
    }, {
      title: '是否开票',
      field: ''
    }, {
      title: '税率',
      field: ''
    }, {
      title: '是否争议',
      field: ''
    }],
    toolbar: '#toolbar',
    clickToSelect: true,
    pagination: true
  });

  //加载日期
$('input[date]').datetimepicker({
          format: 'yyyy-mm-dd',
          autoclose: true,
          minView: 2
});