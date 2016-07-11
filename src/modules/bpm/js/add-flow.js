/*
* @Author: huangzexia
* @Date:   2016-07-11 10:00:31
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-11 11:20:20
*/
import 'orgLeft';
import 'bootstrapTable';
import 'modalRemote';

//----------------页面搜索--------------
let $addon = $('#addon');
$addon
  .on('loaded.modalremote', $modal => {
    $('table').bootstrapTable({
      url: 'data/add-flow',
      sidePagination: 'server',
      clickToSelect: true,
      pagination: true,
      search: true,
      ajaxOptions: {
        dataFilter(res) {
          return JSON.stringify($.parseJSON(res).data);
        }
      },
      columns: [{
        field: 'checked',
        checkbox: true
      }, {
        title: '序号',
        align: 'center',
        field: 'num'
      }, {
        title: '模块',
        align: 'center',
        field: 'module'
      }, {
        title: '页面',
        align: 'center',
        field: 'page'
      }],
    });
     $addon
      .on('ok.modalremote', () => {
        $addon.data('dialog').hide()
      });
  });