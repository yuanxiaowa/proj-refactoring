import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'slider';
$('.J-project')
  .bootstrapTable({
    url: 'data/project',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
    search: false,
    clickToSelect: true,
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
      align: 'center',
      field: 'constructor'
    }, {
      title: '项目',
      align: 'center',
      field: 'pact'
    }, {
      title: '项目负责人',
      align: 'center',
      field: 'principal'
    }, {
      title: '技术总工',
      align: 'center',
      field: 'zg'
    }, {
      title: '施工员',
      align: 'center',
      field: 'sg'
    }, {
      title: '安全员',
      align: 'center',
      field: 'aq'
    }, {
      title: '质量员',
      align: 'center',
      field: 'zl'
    }, {
      title: '仓管员',
      align: 'center',
      field: 'cg'
    }, {
      title: '预算员',
      align: 'center',
      field: 'ys'
    }]
  });
$('.J-member')
  .bootstrapTable({
    url: 'data/member',
    sidePagination: 'server',
    toolbar: '#toolbar-1',
    pagination: true,
    search: false,
    clickToSelect: true,
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
      align: 'center',
      field: 'constructor'
    }, {
      title: '项目简称',
      align: 'center',
      field: 'pact'
    }, {
      title: '人员姓名',
      align: 'center',
      field: 'name'
    }, {
      title: '职务',
      align: 'center',
      field: 'zw'
    }, {
      title: '在场记录',
      align: 'center',
      field: 'zc'
    }, {
      title: '是否兼职',
      align: 'center',
      field: 'jz'
    }, {
      title: '联系方式',
      align: 'center',
      field: 'phone'
    }]
  });

//日期
$('input[date]').datetimepicker();