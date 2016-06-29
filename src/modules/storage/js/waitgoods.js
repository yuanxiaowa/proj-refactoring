/*
* @Author: huangzexia
* @Date:   2016-06-29 09:12:56
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-29 09:26:31
*/
import 'bootstrapTable';
//------------------------弹框搜索----------------
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
      title: '订单编号',
      field: ''
    }, {
      title: '材料编码',
      field: ''
    }, {
      title: '材料名称',
      field: ''
    }, {
      title: '规格型号',
      field: ''
    }, {
      title: '单位',
      field: ''
    }, {
      title: '单价',
      field: ''
    }, {
      title: '订单数量',
      field: ''
    }, {
      title: '已收货数量',
      field: ''
    }],
    toolbar: '#toolbar',
    pagination: true,
    clickToSelect: true
  });

