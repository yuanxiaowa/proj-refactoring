/*
* @Author: huangzexia
* @Date:   2016-07-01 15:46:45
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-06 14:24:56
*/

import 'bootstrapTable';

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
      title: '材料合同',
      align:'center',
      field: 'clht'
    }, {
      title: '合同总额（含变更）',
      align:'center',
      field: 'pactAll'
    }, {
      title: '累计收货总额',
      align:'center',
      field: 'all'
    }, {
      title: '发票总额',
      align:'center',
      field: 'tax-price'
    }, {
      title: '已付金额',
      align:'center',
      field: 'haPay'
    }, {
      title: '已付比例',
      align:'center',
      field: 'pay'
    }, {
      title: '未付金额',
      align:'center',
      field: 'no-pay'
    }, {
      title: '未付比例',
      align:'center',
      field: 'no-bl'
    }, {
      title: '操作',
      align:'center',
      field: 'handle',
      formatter(value) {
        var $edit = `<a href="#" class="">申请付款</a>`;
        return $edit;
      }
    }]
  });