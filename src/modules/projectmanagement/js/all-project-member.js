import 'bootstrapTable';
import 'bootstrapDatetimepicker';

$('.J-project')
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
      title: '施工单位',
      field: ''
    }, {
      title: '项目',
      field: ''
    }, {
      title: '项目负责人',
      field: ''
    }, {
      title: '技术总工',
      field: ''
    }, {
      title: '施工员',
      field: ''
    }, {
      title: '安全员',
      field: ''
    }, {
      title: '质量员',
      field: ''
    }, {
      title: '仓管员',
      field: ''
    }, {
      title: '预算员',
      field: ''
    }],
    toolbar: '#toolbar-1',
    clickToSelect: true,
    pagination: true
  });
$('.J-member')
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
      title: '施工单位',
      field: ''
    }, {
      title: '项目简称',
      field: ''
    }, {
      title: '人员姓名',
      field: ''
    }, {
      title: '职务',
      field: ''
    }, {
      title: '在场记录',
      field: ''
    }, {
      title: '是否兼职',
      field: ''
    }, {
      title: '联系方式',
      field: ''
    }],
    toolbar: '#toolbar',
    clickToSelect: true,
    pagination: true
  });

//日期
$('input[date]').datetimepicker();