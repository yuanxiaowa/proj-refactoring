var $modalRole = $('#modal-role');

var Role = ($roleList => {
  var $left = $roleList.eq(0);
  var $right = $roleList.eq(1);
  return {
    add() {
      $left.find('input:checked').closest('li')
        .appendTo($right);
    },
    addAll() {
      $left.children().appendTo($right);
    },
    remove() {
      $right.find('input:checked').closest('li')
        .appendTo($left);
    },
    removeAll() {
      $right.children().appendTo($left);
    }
  };
})($modalRole.find('.panelm-w'));

$modalRole
  .on('click', '.j-role-a', Role.add)
  .on('click', '.j-role-aa', Role.addAll)
  .on('click', '.j-role-r', Role.remove)
  .on('click', '.j-role-ra', Role.removeAll);

$modalRole.find('form')
  .on('submit', function() {
    return false;
  })
  .find('button')
  .tooltip();