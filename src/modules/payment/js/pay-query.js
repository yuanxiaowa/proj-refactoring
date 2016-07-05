/*
* @Author: huangzexia
* @Date:   2016-07-01 09:57:33
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-05 16:56:22
*/

import 'bootstrapTable';
import 'moreSelected';
//------------------------材料清单----------------
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
      title: '所属部门',
      field: ''
    }, {
      title: '所属项目',
      field: ''
    }, {
      title: '付款单编号',
      field: ''
    }, {
      title: '材料合同',
      field: ''
    }, {
      title: '合同总额',
      field: ''
    }, {
      title: '累计收货总额',
      field: ''
    }, {
      title: '发票金额',
      field: ''
    }, {
      title: '已付金额',
      field: ''
    }, {
      title: '已付比例',
      field: ''
    }, {
      title: '本次申请金额',
      field: ''
    }, {
      title: '编制日期',
      field: ''
    }, {
      title: '审批状态',
      field: ''
    }, {
      title: '支付情况',
      field: ''
    }],
    clickToSelect: true,
     pagination: true
  });