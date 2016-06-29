/*
* @Author: huangzexia
* @Date:   2016-06-15 16:54:40
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-21 15:52:50
*/
import 'bootstrapDatetimepicker';
import webUploader from 'webUploader';
import 'toggle';

//引入时间
$('input[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});

//表格新增
function getTemp(inums) {
    return '<tr><td>'+inums+'</td><td><input type="text" name="fileNum" class="form-control" ></td><td class="filenamestd"></td><td></td><td></td><td><a class="btn btn-primary up-btn">上传</a>  <input type="hidden" name="fileName" class="fileNameArr"/><a href="" class="J-del-member btn btn-default">删除</a></td></tr>';
}
var $fileList = $('.file-list');
var ProcessNum = $('.add-file').prev().find('table tbody').children().length+1;
$fileList.on('click', '.add-file', function () {
          var $tbody = $(this).prev().find('table tbody');
          var $tmp = $(getTemp(ProcessNum));
          var $btn = $tmp.find('.up-btn');
          $tbody.append($tmp);
          ProcessNum++;
          //上传文件
          var uploader = webUploader.create({
              auto: true,
              swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
              pick: $btn,
              server: 'data/fileupload',
              accept: {
              extensions: 'gif,jpg,jpeg,bmp,png,pdf',
              mimeTypes: 'image/*'
              }
             });
          uploader.on( 'uploadSuccess',function(file,response ){
              var filenames =  response.filename;//文件名|路径
              $btn.find('.webuploader-pick').parent().parent().parent().find('.filenamestd').html(filenames);
              $btn.parent().find('.fileNameArr').val(filenames);
          });
        }).on('click', '.J-del-number', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
});
