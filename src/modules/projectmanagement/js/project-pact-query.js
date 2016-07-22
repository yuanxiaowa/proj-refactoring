import 'bootstrapTable';
import 'bootstrapDatetimepicker';
import 'slider';
$('table')
  .bootstrapTable({
    url: 'data/project-pact-query',
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
      title: '施工单位',
      align: 'center',
      field: 'constructor'
    }, {
      title: '工程类别',
      align: 'center',
      field: 'projectType'
    }, {
      title: '行业类别',
      align: 'center',
      field: 'businessName'
    }, {
      title: '合同类别',
      align: 'center',
      field: 'pactType'
    }, {
      title: '合同',
      align: 'center',
      field: 'pact'
    }, {
      title: '项目简介',
      align: 'center',
      field: 'projectInfo'
    }, {
      title: '总包方',
      align: 'center',
      field: 'lumpSum'
    }, {
      title: '建设单位',
      align: 'center',
      field: 'constructorCompany'
    }, {
      title: '企业性质',
      align: 'center',
      field: 'enterpriseProperty'
    }, {
      title: '合同金额',
      align: 'center',
      field: 'pactPrice'
    }, {
      title: '税率',
      align: 'center',
      field: 'Tax'
    }, {
      title: '开工竣工日期',
      align: 'center',
      field: 'date'
    }, {
      title: '负责人',
      align: 'center',
      field: 'principal'
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

//引入时间
$('input[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});