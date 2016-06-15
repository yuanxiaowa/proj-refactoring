import Dialog from 'dialog';
        var editMember = $('.J-edit-member'),
        delMember = $('.J-del-member'),
        addMember = $('.J-add-project-member');

// 编辑
editMember.on('click', function () {
  $(this).parents('tr').find('span').hide();
  $(this).parents('tr').find('.hide-container').show();
});
// 删除
delMember.on('click', function () {
  $(this).parents('tr').remove();
});
//新增
(function () {
  function getTemp(num, tp) {
    var type = tp;
    if ( 1===type) {
      return '<tr>\n        <td>' + num + '</td>\n             <td><select class="form-control"><option>项目管理1</option><option>项目管理2</option></select></td>\n        <td><select class="form-control"><option>经理</option><option>销售</option></select></td>\n        <td><input type="text" class="form-control"/></td>\n        <td><input type="date" class="form-control" /></td>\n       <td><input type="date" class="form-control"/></td>\n    <td><select class="form-control"><option>有效</option><option>无效</option></select></td>\n     <td>\n          <a class="J-del-member" href="">删除</a>\n             </td>\n      </tr>';
    } else if (2 ===type ) {
      return '<tr>\n        <td>' + num + '</td>\n             <td><select class="form-control"><option>建设单位1</option><option>建设单位2</option></select></td>\n        <td><input type="text" class="form-control"></td>\n              <td><input type="text" class="form-control" /></td>\n    <td><input type="text" class="form-control"></td>\n     <td>\n          <a class="J-del-member" href="">删除</a>\n             </td>\n      </tr>';
    } else if (3 === type) {
      return '<tr>\n        <td>' + num + '</td>\n             <td><input type="text" class="form-control"> </td>\n        <td><input type="text" class="form-control"></td>\n        <td><input type="text" class="form-control"/></td>\n           <td><input type="text" class="form-control"/></td>\n         <td>\n          <a class="J-upfile" href="">上传</a>\n   <a class="J-del-member" href="">删除</a>\n             </td>\n      </tr>';
    }
  }
  //新增角色
  $('#modal-role').on('click', '.J-add-project-member', function () {
    var $modalRel = $('#modal-role');
    var $tbody = $(this).parents('.modal-body').find('table tbody');
    var num = $tbody.children().length + 1;
    $tbody.append(getTemp(num, 1));
  }).on('click', '.J-del-member', function (e) {
    $(this).closest('tr').remove();
    e.preventDefault();
  });
  //新增联系方式
  $('#modal-contact').on('click', '.J-add-project-member', function () {
    var $modalRel = $('#modal-contact');
    var $tbody = $(this).parents('.modal-body').find('table tbody');
    var num = $tbody.children().length + 1;
    $tbody.append(getTemp(num, 2));
  }).on('click', '.J-del-member', function (e) {
    $(this).closest('tr').remove();
    e.preventDefault();
  });
  //新增文件
  $('#modal-file').on('click', '.J-add-project-member', function () {
    var $modalRel = $('#modal-file');
    var $tbody = $(this).parents('.modal-body').find('table tbody');
    var num = $tbody.children().length + 1;
    $tbody.append(getTemp(num, 3));
  }).on('click', '.J-del-member', function (e) {
    $(this).closest('tr').remove();
    e.preventDefault();
  });
})();