import 'bootstrapTable';
import 'moreSelected';
import 'slider';
$('table')
  .bootstrapTable({
    url: 'data/supplemental-pact-query',
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
      title: '所属部门',
      align: 'center',
      field: 'bm'
    }, {
      title: '所属项目',
      align: 'center',
      field: 'project'
    }, {
      title: '补充合同名称',
      align: 'center',
      field: 'b-name'
    }, {
      title: '补充合同编号',
      align: 'center',
      field: 'planNum'
    }, {
      title: '主合同',
      align: 'center',
      field: 'main-pact'
    }, {
      title: '供应商',
      align: 'center',
      field: 'of'
    }, {
      title: '材料类型',
      align: 'center',
      field: 'type'
    }, {
      title: '合同总额',
      align: 'center',
      field: 'pact-all'
    }, {
      title: '税额',
      align: 'center',
      field: 'tax'
    }, {
      title: '不含税价',
      align: 'center',
      field: 'no-tax'
    }, {
      title: '签订日期',
      align: 'center',
      field: 'date'
    }, {
      title: '审批状态',
      align: 'center',
      field: 'sta'
    }]
  });
