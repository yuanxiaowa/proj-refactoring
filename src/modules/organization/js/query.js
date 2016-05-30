var $dropmenu = $('.dropmenu');
var $orgLeft = $('#org-left');

$('#dropmenu-show').click(() => {
  $dropmenu.show();
  return false;
});

$dropmenu
  .on('click', 'li', function() {
    $dropmenu.hide();
  });
@include('/modules/dropmenu');

$('#org-menu')
  .on('click', '.org-menu-item', function(e) {
    e.stopPropagation();
    $(this).toggleClass('is-open');
  });
$orgLeft.on('click', '.j-org-op', () => {
  $orgLeft.toggleClass('is-close');
});

// 导入
$('#modal').on('click', '.j-modal-ok', () => {
  $('#modal2').modal('show');
});

$('#modal-edit').on('click', '.j-m-add', function() {
  var $item = $(this).closest('.row');
  $item.clone().appendTo($item.parent());
});

$('#treeview').treeview({
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
});
