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
      title: '施工单位',
      field: 'constructor'
    }, {
      title: '工程类别',
      field: 'projectType'
    }, {
      title: '行业类别',
      field: 'businessName'
    }, {
      title: '合同类别',
      field: 'pactType'
    }, {
      title: '合同',
      field: 'pact'
    }, {
      title: '项目简介',
      field: 'projectInfo'
    }, {
      title: '总包方',
      field: 'lumpSum'
    }, {
      title: '建设单位',
      field: 'constructorCompany'
    }, {
      title: '企业性质',
      field: 'enterpriseProperty'
    }, {
      title: '合同金额',
      field: 'pactPrice'
    }, {
      title: '税率',
      field: 'Tax'
    }, {
      title: '开工竣工日期',
      field: 'date'
    }, {
      title: '负责人',
      field: 'principal'
    }, {
      title: '施工城市',
      field: 'city'
    }, {
      title: '区域',
      field: 'area'
    }, {
      title: '是否归档',
      field: 'isReturn'
    }, {
      title: '审批状态',
      field: 'approveSta'
    }],
    toolbar: '#toolbar',
    pagination: true,
    search: false,
    clickToSelect: true
  });

//引入时间
$('input[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});