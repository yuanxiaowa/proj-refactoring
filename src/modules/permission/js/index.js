
@include('/modules/role');

(() => {
  var $modalRel = $('#modal-rel');
  var $dropmenu = $modalRel.find('.dropmenu');
  var $tbody = $modalRel.find('table tbody');

  function getTemp(name) {
    return `<tr>
        <td>${name}</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td>
          <a class="j-del" href="">删除</a>
          <a class="j-add" href="">新增</a>
        </td>
      </tr>`;
  }

  $modalRel
    .on('click', '.j-add', () => {
      $dropmenu.show();
      return false;
    })
    .on('click', '.j-del', function(e) {
      if (1 < $tbody.children().length) {
        $(this).closest('tr').remove();
      } else {
        $.alert('只剩一项了');
      }
      e.preventDefault();
    })
    .on('click', () => {
      $dropmenu.hide();
    });
  $dropmenu
    .on('click', 'li', function() {
      $tbody.append(getTemp($(this).text()));
      $dropmenu.hide();
    });
  @include('/modules/dropmenu');

})();