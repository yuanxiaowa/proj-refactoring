import 'bootstrapTable';
import 'moreSelected';
import 'slider';

$('table')
  .bootstrapTable({
    url: 'data/purchase-plan',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
    search: false,
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
      align: 'center',
      field: 'num'
    }, {
      title: '采购部门',
      align: 'center',
      field: 'bm'
    }, {
      title: '采购项目',
      align: 'center',
      field: 'project'
    }, {
      title: '计划编号',
      align: 'center',
      field: 'planNum'
    }, {
      title: '材料类型',
      align: 'center',
      field: 'type'
    }, {
      title: '采购总额',
      align: 'center',
      field: 'all'
    }, {
      title: '计划月份',
      align: 'center',
      field: 'date'
    }, {
      title: '项目地区',
      align: 'center',
      field: 'area'
    }, {
      title: '审批状态',
      align: 'center',
      field: 'sta'
    }]
  });