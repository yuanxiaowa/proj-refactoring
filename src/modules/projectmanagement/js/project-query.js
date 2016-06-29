import 'bootstrapTable';
import 'bootstrapDatetimepicker';

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
      title: '工程类别',
      field: 'projectType'
    }, {
      title: '项目编号',
      field: 'projectNum'
    }, {
      title: '项目全称',
      field: 'projectName'
    }, {
      title: '项目简介',
      field: 'projectInfo'
    }, {
      title: '项目负责人',
      field: 'projectManage'
    }, {
      title: '建设单位',
      field: 'constructorCompany'
    }, {
      title: '工程地点',
      field: 'projectArea'
    }, {
      title: '合同总额',
      field: 'pactPrice'
    }, {
      title: '项目状态',
      field: 'projectSta'
    }, {
      title: '审核状态',
      field: 'checkSta'
    }],
    toolbar: '#toolbar',
    pagination: true,
    search: false,
    clickToSelect: true
  });
