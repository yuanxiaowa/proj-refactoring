/*
* @Author: huangzexia
* @Date:   2016-07-14 15:13:48
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-14 15:36:03
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
    url: 'data/query',
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
      title: '报告编号',
      field: 'bg',
      align:'center'
    }, {
      title: '报告名称',
      field: 'name',
      align:'center'
    }, {
      title: '申请部门',
      field: 'pact',
      align:'center'
    }, {
      title: '申请人',
      field: 'apply',
      align:'center'
    }, {
      title: '申请日期',
      field: 'date',
      align:'center'
    }, {
      title: '报告类型',
      field: 'type',
      align:'center'
    }, {
      title: '审批状态',
      field: 'sta',
      align:'center'
    }]
  });
