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
      field: ''
    }, {
      title: '所属部门',
      field: ''
    }, {
      title: '所属项目',
      field: ''
    }, {
      title: '补充合同名称',
      field: ''
    }, {
      title: '补充合同编号',
      field: ''
    }, {
      title: '主合同',
      field: ''
    }, {
      title: '供应商',
      field: ''
    }, {
      title: '材料类型',
      field: ''
    }, {
      title: '合同总额',
      field: ''
    }, {
      title: '税额',
      field: ''
    }, {
      title: '不含税价',
      field: ''
    }, {
      title: '签订日期',
      field: ''
    }, {
      title: '审批状态',
      field: ''
    }],
    toolbar: '#toolbar',
    pagination: true,
    clickToSelect: true
  });
