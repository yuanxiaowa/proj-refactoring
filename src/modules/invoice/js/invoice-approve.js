/*
* @Author: huangzexia
* @Date:   2016-07-04 15:47:13
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-12 15:28:58
*/
import 'slider';
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
    url: 'data/invoice-approve',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
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
    },{
      title: '编号',
      field: 'num',
      align:'center',
      formatter:function(value,row,index){  
        return index+1;
      }
    }, {
      title: '发票类型',
      align:'center',
      field: 'tax-type'
    }, {
      title: '开票单位',
      align:'center',
      field: 'company'
    }, {
      title: '发票代码',
      align:'center',
      field: 'dm'
    }, {
      title: '发票号码',
      align:'center',
      field: 'hm'
    }, {
      title: '开票日期',
      align:'center',
      field: 'time'
    }, {
      title: '开票期限',
      align:'center',
      field: 'date'
    }, {
      title: '发票总额',
      align:'center',
      field: 'taxAll'
    }, {
      title: '税率',
      align:'center',
      field: 'sl'
    }, {
      title: '税额',
      align:'center',
      field: 'se'
    }
    , {
      title: '不含税价',
      align:'center',
      field: 'no-tax'
    }
    , {
      title: '认证日期',
      align:'center',
      field: 'approve-time'
    }, {
      title: '认证状态',
      align:'center',
      field: 'sta'
    }]
  });

  $('.J-approve-pass').on('click',function(){
    $('#invoice-approve').modal('show');
  })
