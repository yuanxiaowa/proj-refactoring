import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'slider';

$('table')
  .bootstrapTable({
    url: 'data/project-query',
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
      title: '工程类别',
      align: 'center',
      field: 'p-type'
    }, {
      title: '项目编号',
      align: 'center',
      field: 'p-num'
    }, {
      title: '项目全称',
      align: 'center',
      field: 'p-name'
    }, {
      title: '项目简介',
      align: 'center',
      field: 'pj'
    }, {
      title: '项目负责人',
      align: 'center',
      field: 'fz'
    }, {
      title: '建设单位',
      align: 'center',
      field: 'dw'
    }, {
      title: '工程地点',
      align: 'center',
      field: 'area'
    }, {
      title: '合同总额',
      align: 'center',
      field: 'sum'
    }, {
      title: '项目状态',
      align: 'center',
      field: 'p-sta'
    }, {
      title: '审核状态',
      align: 'center',
      field: 's-sta'
    }]
  });

