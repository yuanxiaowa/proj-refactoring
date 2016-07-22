import 'bootstrapTable';
import 'moreSelected';
import 'slider';
$('table')
  .bootstrapTable({
    url: 'data/material-pact',
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
      field: 'cg-bm'
    }, {
      title: '所属项目',
      align: 'center',
      field: 'project'
    }, {
      title: '合同名称',
      align: 'center',
      field: 'pactName'
    }, {
      title: '合同编号',
      align: 'center',
      field: 'pactNum'
    }, {
      title: '对应采购单',
      align: 'center',
      field: 'dy'
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
      field: 'all'
    }, {
      title: '税额',
      align: 'center',
      field: 'tax'
    }, {
      title: '不含税价',
      align: 'center',
      field: 'n-tax'
    }, {
      title: '创建日期',
      align: 'center',
      field: 'date'
    }, {
      title: '审批状态',
      align: 'center',
      field: 'sta'
    }]
  });