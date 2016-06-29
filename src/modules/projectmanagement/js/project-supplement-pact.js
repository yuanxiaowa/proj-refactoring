import 'bootstrapTable';
import 'bootstrapDatetimepicker';
//引入时间
$('input[date]').datetimepicker();
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
      title: '施工单位',
      field: ''
    }, {
      title: '合同名称',
      field: ''
    }, {
      title: '合同编号',
      field: ''
    }, {
      title: '合同金额',
      field: ''
    }, {
      title: '项目负责人',
      field: ''
    }, {
      title: '变更类型',
      field: ''
    }, {
      title: '施工城市',
      field: ''
    }, {
      title: '区域',
      field: ''
    }, {
      title: '是否归档',
      field: ''
    }, {
      title: '审批状态',
      field: ''
    }],
    toolbar: '#toolbar',
    clickToSelect: true,
    pagination: true
  });

