import 'bootstrapTable';
import 'moreSelected'
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
      title: '供应商编号',
      field: ''
    }, {
      title: '供应商名称',
      field: ''
    }, {
      title: '单位类型',
      field: ''
    }, {
      title: '供货范围',
      field: ''
    }, {
      title: '供货类别',
      field: ''
    }, {
      title: '联系人',
      field: ''
    }, {
      title: '联系电话',
      field: ''
    }, {
      title: '开票类型',
      field: ''
    }, {
      title: '税率',
      field: ''
    }, {
      title: '类别',
      field: ''
    }, {
      title: '审批状态',
      field: ''
    }],
    toolbar: '#toolbar',
    clickToSelect: true,
    pagination: true
  });