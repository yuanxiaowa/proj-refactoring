import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'slider';
$('table')
  .bootstrapTable({
    url: 'data/supplier-deal-query',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
    clickToSelect: true,
    showColumns:true,
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      field: 'checked',
      checkbox: true
    },{
      title: '编号',
      field: 'num',
      align:'center',
      formatter:function(value,row,index){  
        return index+1;
      }
    }, {
      title: '订单号',
      align:'center',
      field: 'orderNum'
    }, {
      title: '订单名称',
      align:'center',
      field: 'orderName'
    }, {
      title: '所属部门',
      align:'center',
      field: 'bm'
    }, {
      title: '所属项目',
      field: 'project'
    }, {
      title: '成交时间',
      align:'center',
      field: 'deal-time'
    }, {
      title: '发货时间',
      align:'center',
      field: 'fh'
    }, {
      title: '交易金额',
      align:'center',
      field: 'all'
    }, {
      title: '是否开票',
      align:'center',
      field: 'isYes'
    }, {
      title: '税率',
      align:'center',
      field: 'tax'
    }, {
      title: '是否争议',
      align:'center',
      field: 'isQ'
    }]
  });

  //加载日期
$('input[date]').datetimepicker({
          format: 'yyyy-mm-dd',
          autoclose: true,
          minView: 2
});