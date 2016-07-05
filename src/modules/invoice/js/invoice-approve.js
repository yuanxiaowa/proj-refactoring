/*
* @Author: huangzexia
* @Date:   2016-07-04 15:47:13
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-04 17:29:20
*/

import 'bootstrapTable';
import 'bootstrapDatetimepicker';
//------------------------时间引入----------------
$('input[date]').datetimepicker(
  {
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
  }
);
//------------------------查询结果-----------------
$('#query-list')
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
      title: '发票类型',
      field: ''
    }, {
      title: '开票单位',
      field: ''
    }, {
      title: '发票代码',
      field: ''
    }, {
      title: '发票号码',
      field: ''
    }, {
      title: '开票日期',
      field: ''
    }, {
      title: '开票期限',
      field: ''
    }, {
      title: '发票总额',
      field: ''
    }, {
      title: '税率',
      field: ''
    }, {
      title: '税额',
      field: ''
    }
    , {
      title: '不含税价',
      field: ''
    }
    , {
      title: '认证日期',
      field: ''
    }, {
      title: '认证状态',
      field: ''
    }],
    toolbar: '#toolbar',
    pagination: true,
    clickToSelect: true
  });

  $('.J-approve-pass').on('click',function(){
    $('#invoice-approve').modal('show');
  })
