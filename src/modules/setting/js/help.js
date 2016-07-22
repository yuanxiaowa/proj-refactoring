/*
* @Author: huangzexia
* @Date:   2016-07-16 13:53:59
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-16 15:12:10
*/
import 'orgLeft';
import 'bootstrapTable';

$('table').bootstrapTable({
      url: 'data/help',
      sidePagination: 'server',
      pagination: true,
      ajaxOptions: {
        dataFilter(res) {
          return JSON.stringify($.parseJSON(res).data);
        }
      },
      columns: [{
        title: '操作',
        align: 'center',
        field: 'cz',

      }, {
        title: '所需用户权限',
        align: 'center',
        field: 'qx'
      }],
    });