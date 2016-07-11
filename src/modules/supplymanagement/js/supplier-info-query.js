import 'bootstrapTable';
import 'moreSelected'
$('table')
  .bootstrapTable({
    url: 'data/supplier-info-query',
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
    }, {
      title: '编号',
      field: 'num',
      align:'center',
      formatter:function(value,row,index){  
        return index+1;
      }
    }, {
      title: '供应商编号',
      align:'center',
      field: 's-num'
    }, {
      title: '供应商名称',
      align:'center',
      field: 'name'
    }, {
      title: '单位类型',
      align:'center',
      field: 'conpany-type'
    }, {
      title: '供货范围',
      align:'center',
      field: 'area'
    }, {
      title: '供货类别',
      align:'center',
      field: 'offer-type'
    }, {
      title: '联系人',
      align:'center',
      field: 'link'
    }, {
      title: '联系电话',
      align:'center',
      field: 'phone'
    }, {
      title: '开票类型',
      align:'center',
      field: 'bill-type'
    }, {
      title: '税率',
      align:'center',
      field: 'tax'
    }, {
      title: '类别',
      align:'center',
      field: 'type'
    }, {
      title: '审批状态',
      align:'center',
      field: 'sta'
    }]
  });