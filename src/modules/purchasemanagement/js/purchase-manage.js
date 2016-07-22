import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'moreSelected';
import 'slider';

$('table')
  .bootstrapTable({
    url: 'data/pur-m',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
    search: false,
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
    }, {
      title: '编号',
      align: 'center',
      field: 'num'
    }, {
      title: '采购单名称',
      align: 'cg-name',
      field: ''
    }, {
      title: '采购单编号',
      align: 'center',
      field: 'cg-num'
    }, {
      title: '采购部门',
      align: 'cg-bm',
      field: ''
    }, {
      title: '材料类型',
      align: 'center',
      field: 'type'
    }, {
      title: '采购总额',
      align: 'center',
      field: 'all'
    }, {
      title: '发票类型',
      align: 'center',
      field: 'tax-type'
    }, {
      title: '税率',
      align: 'center',
      field: 'tax'
    }, {
      title: '是否发布',
      align: 'center',
      field: 'isOn'
    }, {
      title: '审核状态',
      align: 'center',
      field: 'sta'
    }, {
      title: '采购单状态',
      align: 'center',
      field: 'cg-sta'
    }, {
      title: '操作',
      align: 'center',
      formatter:function(value,row,index){  
        var look = '<a href="price-exchange.html" >'+'查看报价'+'</a> ';
        var end = '<a href="javascript:;" >'+'终止报价'+'</a> ';
        return look+end;  
      } 
    }]
  });
