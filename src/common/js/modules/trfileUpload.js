import webUploader from 'webUploader';
function getfiletr(inums) {
    return '<tr><td>'+inums+'</td><td><input type="text" name="filenum" class="form-control" >'
            +'</td><td class="filenametd"></td><td class="filebytd"></td><td class="filedatetd"></td>'
            +'<td><a class="btn btn-primary up-btn">上传</a>  <input type="hidden" name="filenametmp" class="filenametmp"/>'
            +'<input type="hidden" name="filedatetmp" class="filedatetmp"/><input type="hidden" name="filebytmp" class="filebytmp"/>'
            +'<a href="javascript:;" class="J-del-number btn btn-default">删除</a></td></tr>';
}
    var $upFileContainer = $("#tab2,#tab3,#tab4").find('.up-file-container');
    var ProcessNum = $upFileContainer.find('table tbody').children().length+1;
    $upFileContainer.on('click', '.add-cos', function () {
              var $tbodys = $upFileContainer.find('table tbody');
              var $tmp = $(getfiletr(ProcessNum));
             

              var $btn = $tmp.find('.up-btn');
              $tbodys.append($tmp);
              ProcessNum++;
              //上传文件
              var uploader = webUploader.create({
                  auto: true,
                  swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
                  pick: $btn,
                  server: 'data/fileupload',
                  accept: {
                  extensions: 'gif,jpg,jpeg,bmp,png',
                  mimeTypes: 'image/*'
                  }
              });
              //文件上传成功
              uploader.on('uploadSuccess',function(file,response ){
                  $btn.parent().parent().find('.filenametd').html(response.filename);
                  $btn.parent().parent().find('.filebytd').html(response.fileby);
                  $btn.parent().parent().find('.filedatetd').html(response.filedate);
                  $btn.parent().find('.filenametmp').val(response.filename);
                  $btn.parent().find('.filedatetmp').val(response.filedate);
                  $btn.parent().find('.filebytmp').val(response.fileby);
              });
    }).on('click', '.J-del-number', function (e) {
              $(this).closest('tr').remove();
              e.preventDefault();
    });
