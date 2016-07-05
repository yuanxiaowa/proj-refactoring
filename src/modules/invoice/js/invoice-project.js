/*
* @Author: huangzexia
* @Date:   2016-07-05 09:04:40
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-05 09:40:55
*/

import 'bootstrapTable';
//------------------------查询结果-----------------
$('#query-list')
  .bootstrapTable({
    url: 'data/query-list',
    sidePagination: 'server',
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      title: '所属部门',
      field: 'payStyle'
    }, {
      title: '所属项目',
      field: 'Project'
    }, {
      title: '合同总额',
      field: 'pactPrice'
    }, {
      title: '材料合同',
      field: 'cPrice',
      colspan :'3'
    }, {
      title: '材料合同总额',
      field: 'cAll'
    }, {
      title: '已付总额',
      field: 'hasPay'
    }, {
      title: '发票总额',
      field: 'invoicePrice'
    }, {
      title: '发票差额',
      field: 'taxP'
    }, {
      title: '发票号',
      field: 'taxNum'
    }, {
      title: '发票金额',
      field: 'taxAll'
    }],
    toolbar: '#toolbar',
    pagination: true
  });

