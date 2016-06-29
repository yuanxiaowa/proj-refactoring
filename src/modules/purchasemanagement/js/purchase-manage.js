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
      field: 'checked',
      checkbox: true
    }, {
      title: '编号',
      field: ''
    }, {
      title: '采购单名称',
      field: ''
    }, {
      title: '采购单编号',
      field: ''
    }, {
      title: '采购部门',
      field: ''
    }, {
      title: '材料类型',
      field: ''
    }, {
      title: '采购总额',
      field: ''
    }, {
      title: '发票类型',
      field: ''
    }, {
      title: '税率',
      field: ''
    }, {
      title: '是否发布',
      field: ''
    }, {
      title: '审核状态',
      field: ''
    }, {
      title: '采购单状态',
      field: ''
    }, {
      title: '操作',
      field: '',
      formatter:function(value,row,index){  
        var look = '<a href="user/userDetail/'+row.id+'.do" >'+888888+'</a> ';
        var end = '<a href="user/userDetail/'+row.id+'.do" >'+88888+'</a> ';
        return look+end;  
      } 
    }],
    toolbar: '#toolbar',
    pagination: true,
    search: false,
    clickToSelect: true
  });
