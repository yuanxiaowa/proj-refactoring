/*
* @Author: huangzexia
* @Date:   2016-07-04 11:38:42
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-12 15:25:47
*/
import 'slider';
import 'bootstrapDatetimepicker';
import 'bootstrapTable';
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
    url: 'data/invoice-query',
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
    }, {
      title: '编号',
      field: 'num',
      align:'center',
      formatter:function(value,row,index){  
        return index+1;
      }
    }, {
      title: '所属部门',
      field: 'bm',
      align:'center'
    }, {
      title: '所属项目',
      field: 'project',
      align:'center'
    }, {
      title: '材料合同',
      field: 'pact',
      align:'center'
    }, {
      title: '发票类型',
      field: 'tax-type',
      align:'center'
    }, {
      title: '开票单位',
      field: 'company',
      align:'center'
    }, {
      title: '发票代码',
      field: 'dm',
      align:'center'
    }, {
      title: '发票号码',
      field: 'hm',
      align:'center'
    }, {
      title: '开票日期',
      field: 'time',
      align:'center'
    }, {
      title: '开票期限',
      field: 'date',
      align:'center'
    }, {
      title: '发票总额',
      field: 'all',
      align:'center'
    }
    , {
      title: '税率',
      field: 'tax',
      align:'center'
    }
    , {
      title: '税额',
      field: 'tax-price',
      align:'center'
    }
    , {
      title: '不含税价',
      field: 'no-tax',
      align:'center'
    }
    , {
      title: '认证日期',
      field: 'approve-time',
      align:'center'
    }
    , {
      title: '认证状态',
      field: 'sta',
      align:'center'
    }]
  });
