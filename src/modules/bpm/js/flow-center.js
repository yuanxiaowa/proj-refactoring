/*
* @Author: huangzexia
* @Date:   2016-07-11 09:33:58
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-11 09:48:26
*/
import 'bootstrapTable';

//---------------------------查询结果------------------
$('#search-list').bootstrapTable({
    url: 'data/flow-center',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
    clickToSelect: true,
    search:true,
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      field: 'checked',
      checkbox: true
    }, {
      title: '页面',
      field: 'page',
      align: 'center'
    }, {
      title: '流程名称',
      field: 'flow-name',
      align: 'center'
    }, {
      title: '流程',
      field: 'flow',
      align: 'center'
    }, {
      title: '状态',
      field: 'statu',
      align: 'center'
    }]
});