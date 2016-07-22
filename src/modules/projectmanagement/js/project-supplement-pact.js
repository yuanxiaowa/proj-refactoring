import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'slider';
//引入时间
$('input[date]').datetimepicker();
$('table')
  .bootstrapTable({
    url: 'data/project-supplement-pact',
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
      title: '编号',
      align: 'center',
      field: 'num'
    }, {
      title: '施工单位',
      align: 'center',
      field: 'constructor'
    }, {
      title: '合同名称',
      align: 'center',
      field: 'pact'
    }, {
      title: '合同编号',
      align: 'center',
      field: 'pactnum'
    }, {
      title: '合同金额',
      align: 'center',
      field: 'pactPrice'
    }, {
      title: '项目负责人',
      align: 'center',
      field: 'principal'
    }, {
      title: '变更类型',
      align: 'center',
      field: 'change'
    }, {
      title: '施工城市',
      align: 'center',
      field: 'city'
    }, {
      title: '区域',
      align: 'center',
      field: 'area'
    }, {
      title: '是否归档',
      align: 'center',
      field: 'isReturn'
    }, {
      title: '审批状态',
      align: 'center',
      field: 'approveSta'
    }]
  });

