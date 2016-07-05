/*
* @Author: huangzexia
* @Date:   2016-07-04 15:30:06
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-05 16:53:09
*/

import 'bootstrapTable';
//------------------------查询结果-----------------
$('#query-list')
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
      title: '所属部门',
      field: ''
    }, {
      title: '所属项目',
      field: ''
    }, {
      title: '材料合同',
      field: ''
    }, {
      title: '供应商',
      field: ''
    }, {
      title: '合同总额',
      field: ''
    }, {
      title: '累计收货',
      field: ''
    }, {
      title: '累计付款',
      field: ''
    }, {
      title: '合同累计发票总额',
      field: ''
    }, {
      title: '发票差额',
      field: ''
    }, {
      title: '本次发票总额',
      field: ''
    }
    , {
      title: '发票张数',
      field: ''
    }
    , {
      title: '审批状态',
      field: ''
    }],
    toolbar: '#toolbar',
    pagination: true,
    clickToSelect: true
  });
