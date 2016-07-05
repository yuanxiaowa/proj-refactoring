/*
* @Author: huangzexia
* @Date:   2016-07-01 15:46:45
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-01 15:49:49
*/

import 'bootstrapTable';

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
      title: '材料合同',
      field: ''
    }, {
      title: '合同总额（含变更）',
      field: ''
    }, {
      title: '累计收货总额',
      field: ''
    }, {
      title: '发票总额',
      field: ''
    }, {
      title: '已付金额',
      field: ''
    }, {
      title: '已付比例',
      field: ''
    }, {
      title: '未付金额',
      field: ''
    }, {
      title: '未付比例',
      field: ''
    }, {
      title: '操作',
      field: ''
    }],
    clickToSelect: true,
    pagination: true
  });