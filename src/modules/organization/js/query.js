import 'bootstrapTable';
import 'zTree';
import 'dialog';
import 'modalRemote';
import 'orgLeft';
import formValidation from 'formValidation';
import render from 'render';


// 渲染详细信息
render({
  cur: '苏州分公司',
  num: 'SSDD89790',
  higher: '江建集团',
  sort: -5,
  recharge: '李起',
  desc: '江建集团',
  isfb: '是'
}).then($ele => {
  $ele.on('click', '.j-del', () => {
    $.confirm('确定要删除吗？')
      .done(() => {
        // 确定删除
      });
  });
});

$('table')
  .bootstrapTable({
    url: 'data/query-table',
    sidePagination: 'server',
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      title: '编号',
      field: 'id'
    }, {
      title: '姓名',
      field: 'username'
    }, {
      title: '性别',
      field: 'gendar'
    }, {
      title: '编号',
      field: 'num'
    }, {
      title: '部门',
      field: 'department'
    }, {
      title: '职务',
      field: 'duty'
    }, {
      title: '职位',
      field: 'position'
    }, {
      title: '已激活',
      field: 'isActivate'
    }, {
      title: '禁用',
      field: 'isFb'
    }],
    toolbar: '#toolbar',
    pagination: true,
    search: true
  });

// 导入
/*$('#modal').on('click', '.j-modal-ok', () => {
  $('#modal2').modal('show');
});

$('#modal-edit').on('click', '.j-m-add', function() {
  var $item = $(this).closest('.row');
  $item.clone().appendTo($item.parent());
});*/

$('#link-next').on('loaded.modalremote', $modal => {
 /* $('#treeview').treeview({
    showBorder: false,
    // nodeIcon: 'icon-folder-close-alt',
    expandIcon: 'icon-caret-right',
    collapseIcon: 'icon-caret-down',
    showCheckbox: true,
    selectable: false,
    checkedIcon: 'icon-check',
    uncheckedIcon: 'icon-check-empty',
    // selectedIcon: 'icon-check',
    data: [{
      text: '江建集团',
      icon: 'icon-folder-close-alt',
      nodes: [{
        text: '广州分公司',
        icon: 'icon-folder-close-alt',
        nodes: [{
          text: '第一项目部'
        }, {
          text: '第二项目部'
        }]
      }]
    }, {
      text: '所有人员',
      icon: 'icon-folder-close-alt',
      nodes: [{
        text: '李起光'
      }, {
        text: '尹斗俊'
      }]
    }]
  });*/
});