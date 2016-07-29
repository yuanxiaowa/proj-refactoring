/*
* @Author: huangzexia
* @Date:   2016-07-16 13:53:59
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-27 11:39:04
*/
import 'zTree';
import 'bootstrapTable';
//树形菜单
var setting = {
  view: {
    showIcon: showIconForTree
  },
  data: {
    simpleData: {
      enable: true
    }
  }
};
var zNodes = [{
  id: 1,
  pId: 0,
  name: "江安集团",
  open: true
}, {
  id: 11,
  pId: 1,
  name: "财务部"
}, {
  id: 111,
  pId: 11,
  name: "会计"
}, {
  id: 112,
  pId: 11,
  name: "财务总监"
}, {
  id: 2,
  pId: 2,
  name: "工程部"
}, {
  id: 221,
  pId: 22,
  name: "人力资源中心"
}];

function showIconForTree(treeId, treeNode) {
  return !treeNode.isParent;
};

$(document).ready(function() {
  $.fn.zTree.init($('#treeDemo'), setting, zNodes);
});





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