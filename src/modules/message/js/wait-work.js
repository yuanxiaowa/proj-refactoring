/*
* @Author: huangzexia
* @Date:   2016-07-15 15:00:40
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-18 10:56:15
*/

import 'bootstrapTable';
$('table')
  .bootstrapTable({
    url: 'data/wait-work',
    sidePagination: 'server',
    search: true,
    toolbar: '#toolbar',
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      title: '序号',
      align: 'center',
      field: 'Num'
    }, {
      title: '时间',
      align: 'center',
      field: 'time'
    }, {
      title: '名称',
      align: 'center',
      field: 'name'
    }, {
      title: '提交人',
      align: 'center',
      field: 'people'
    }, {
      title: '提交部门',
      align: 'center',
      field: 'bm'
    }, {
      title: '状态',
      align: 'center',
      field: 'sta'
    }, {
      title: '详情',
      align: 'center',
      formatter:function(value,row,index){  
        var look = '<a href="detail.html" >'+'查看'+'</a> ';
        return look;  
      } 
    }]
  });