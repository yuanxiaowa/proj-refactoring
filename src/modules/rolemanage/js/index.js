import Dropmenu from '/modules/dropmenu';
import Role from '/modules/role';

var $modalRole = $('#modal-role');

var role = Role($modalRole);

Dropmenu($('.dropmenu'));

// 点击保存
$modalRole.on('click', '.j-modal-ok', () => {
  // 通过 role.getDatas() 来获取数据
  let arr = role.getDatas();
  $modalRole.modal('hide');
});