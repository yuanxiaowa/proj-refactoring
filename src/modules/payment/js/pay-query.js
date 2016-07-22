/*
* @Author: huangzexia
* @Date:   2016-07-01 09:57:33
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-12 15:22:47
*/
import 'slider';
import 'bootstrapTable';
import 'moreSelected';
//------------------------材料清单----------------
$('table')
  .bootstrapTable({
    url: 'data/pay-query',
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
      title: '所属部门',
      align:'center',
      field: 'bm'
    }, {
      title: '所属项目',
      align:'center',
      field: 'project'
    }, {
      title: '付款单编号',
      align:'center',
      field: 'pay-num'
    }, {
      title: '材料合同',
      align:'center',
      field: 'clht'
    }, {
      title: '合同总额',
      align:'center',
      field: 'pactAll'
    }, {
      title: '累计收货总额',
      align:'center',
      field: 'all'
    }, {
      title: '发票金额',
      align:'center',
      field: 'tax-price'
    }, {
      title: '已付金额',
      align:'center',
      field: 'haPay'
    }, {
      title: '已付比例',
      align:'center',
      field: 'bl'
    }, {
      title: '本次申请金额',
      align:'center',
      field: 'now'
    }, {
      title: '编制日期',
      align:'center',
      field: 'time'
    }, {
      title: '审批状态',
      align:'center',
      field: 'sta'
    }, {
      title: '支付情况',
      align:'center',
      field: 'other'
    }]
  });