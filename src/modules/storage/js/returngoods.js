/*
* @Author: huangzexia
* @Date:   2016-06-29 14:19:03
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-30 14:38:54
*/
import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'moreSelected';

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
      title: '操作类型',
      field: ''
    }, {
      title: '收货/退货编号',
      field: ''
    }, {
      title: '供应商',
      field: ''
    }, {
      title: '验收总额',
      field: ''
    }, {
      title: '税额',
      field: ''
    }, {
      title: '不含税价',
      field: ''
    }, {
      title: '发票总额',
      field: ''
    }, {
      title: '验收人',
      field: ''
    }, {
      title: '验收日期',
      field: ''
    }, {
      title: '编制日期',
      field: ''
    }, {
      title: '审批状态',
      field: ''
    }],
    pagination: true,
    clickToSelect: true
  });
//------------------------时间引入----------------
$('input[date]').datetimepicker(
  {
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
  }
  );
