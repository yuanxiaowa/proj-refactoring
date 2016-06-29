    import Dialog from 'dialog';
    import render from 'render';
    import 'bootstrapDatetimepicker';
    import webUploader from 'webUploader';

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
        if(1===type) {
          return '<tr><td>' + num + '</td><td><select class="form-control"><option>项目管理1</option><option>项目管理2</option></select></td><td><select class="form-control"><option>经理</option><option>销售</option></select></td><td><input type="text" class="form-control"/></td><td><input type="text" date="true" class="form-control" /></td><td><input type="text" date="true" class="form-control"/></td><td><select class="form-control"><option>有效</option><option>无效</option></select></td><td><a class="J-del-member btn btn-default" href="">删除</a></td></tr>';
        } else if (2 ===type ) {
          return '<tr><td>' + num + '</td><td><select class="form-control"><option>建设单位1</option><option>建设单位2</option></select></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control" /></td><td><input type="text" class="form-control"></td><td><a class="J-del-member btn btn-default" href="">删除</a></td></tr>';
        } else if (3 === type) {
          return '<tr><td>' + num + '</td><td><input type="text" class="form-control"> </td><td><span class="fileNameSpan"></span></td><td><input type="text" class="form-control"/></td><td><input type="text" class="form-control"/></td><td><a  class="btn btn-primary up-btn" >上传</a> <input type="hidden" name="fileName" class="fileNameArr"/><a class="J-del-member btn btn-default" href="">删除</a></td></tr>';
        }
      }
      //新增角色
      var $memberltpl = $$include('/partials/project-menmber');
      var $memberEdit = $("#member-edit");
      var memberDialog =new Dialog({
          title:"编辑项目成员",
          size:Dialog.SIZELG,
          content:$memberltpl,
          btnsTxt:{
            stxt:"保存"
          }
        });
      $memberEdit.on("click",function(){
        memberDialog.show()
      })

      $('.modal-lg').on('click', '.J-add-project-member', function () {
        var $modalRel = $('#modal-role');
        var $tbody = $(this).parents('.modal-body').find('table tbody');
        var num = $tbody.children().length + 1;
        var $tabstr = $(getTemp(num, 1));
        $tbody.append( $tabstr );
        //引入时间
        $tabstr.find('input[date]').datetimepicker({
          format: 'yyyy-mm-dd',
          autoclose: true,
          minView: 2
          });
      }).on('click', '.J-del-member', function (e) {
        $(this).closest('tr').remove();
        e.preventDefault();
      });
      //新增联系方式
      $('.member-edit-department').on('click', '.J-add-project-member', function () {
        var $tbody = $(this).parent().find('table tbody');
        var num = $tbody.children().length + 1;
        $tbody.append(getTemp(num, 2));
      }).on('click', '.J-del-member', function (e) {
        $(this).closest('tr').remove();
        e.preventDefault();
      });
      //新增文件
      $('.member-edit-file').on('click', '.J-add-project-member', function () {
        var $tbody = $(this).parent().find('table tbody');
        var num = $tbody.children().length + 1;
        var $tmp = $(getTemp(num, 3));
        $tbody.append($tmp);
        var $upbtn = $tmp.find('.up-btn');
        //上传图片
        var uploader = webUploader.create({
          auto: true,
          swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
          pick: $upbtn,
          server: 'data/fileupload',
          accept: {
           extensions: 'doc, docx, pdf',
            mimeTypes: 'application/pdf, application/msword'
          }
        });
        uploader.on( 'uploadSuccess',function(file,response ) {
              var filenames =  response.filename;//文件名|路径
              $tmp.find('.fileNameSpan').text(filenames);
              $tmp.parent().find('.fileNameArr').val(filenames);
        });
      }).on('click', '.J-del-member', function (e) {
        $(this).closest('tr').remove();
        e.preventDefault();
      });
    })();