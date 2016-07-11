/*
* @Author: huangzexia
* @Date:   2016-07-04 15:30:06
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-06 11:33:54
*/

import 'bootstrapTable';
//------------------------查询结果-----------------
$('#query-list')
  .bootstrapTable({
    url: 'data/invoice-add-query',
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
      type: 'genNum'
    }, {
      title: '编号',
      field: 'num',
      align:'center',
      formatter:function(value,row,index){  
        return index+1;
      }
    }, {
      title: '所属部门',
      field: 'bm',
      align:'center'
    }, {
      title: '所属项目',
      align:'center',
      field: 'project'
    }, {
      title: '材料合同',
      align:'center',
      field: 'pact'
    }, {
      title: '供应商',
      align:'center',
      field: 'company'
    }, {
      title: '合同总额',
      align:'center',
      field: 'pactAll'
    }, {
      title: '累计收货',
      align:'center',
      field: 'sh'
    }, {
      title: '累计付款',
      align:'center',
      field: 'hasPay'

    }, {
      title: '合同累计发票总额',
      align:'center',
      field: 'htze'
    }, {
      title: '发票差额',
      align:'center',
      field: 'fpce'
    }],
    toolbar: '#toolbar',
    pagination: true,
    clickToSelect: true
  });
