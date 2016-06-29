import 'bootstrapTable';

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
      field: 'num'
    }, {
      title: '采购部门',
      field: ''
    }, {
      title: '采购项目',
      field: ''
    }, {
      title: '计划编号',
      field: ''
    }, {
      title: '材料类型',
      field: ''
    }, {
      title: '采购总额',
      field: ''
    }, {
      title: '计划月份',
      field: ''
    }, {
      title: '项目地区',
      field: ''
    }, {
      title: '审批状态',
      field: ''
    }],
    toolbar: '#toolbar',
    pagination: true,
    search: false,
    clickToSelect: true
  });