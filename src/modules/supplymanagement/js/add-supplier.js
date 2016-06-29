/*
* @Author: huangzexia
* @Date:   2016-06-17 15:15:48
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-17 15:16:20
*/
import 'bootstrapDatetimepicker';
import webUploader from 'webUploader';

var $toggle = $('.J-toggle'),
    on = true;
    $('.list-title').on('click', function() {
      if(on) {
        $(this).next('.form-item-box').slideUp();
        $(this).children($toggle).html('展开+');
        on=false;
      }else {
        $(this).next('.form-item-box').slideDown();
        $(this).children($toggle).html('收起-');
        on = !on;
      }
    });
var $departType = $('.departType').find('input[type="radio"]');
$departType.on('click', function() {
      var dtype = $(this).val(); 
      if(dtype == 2) {
        $('.dTtext').next().text('税务登记证号: ');
        $('.dTinput').find('input[type="text"]').attr('name', 'taxNo');
      } else {
        $('.dTtext').next().text('身份证号: ');
        $('.dTinput').find('input[type="text"]').attr('name', 'idNo');  
      }
});
function getTemp(num,tp) {
    if(tp == 1) {
      return '<tr><td>' + num + '</td><td><select class="form-control"><option>企业资质1</option><option>企业资质1</option></select></td><td><input type="text" class="form-control"/></td><td><input type="text" class="form-control"/></td><td><input type="text" date="true" class="form-control" /></td><td><textarea class="form-control"></textarea></td><td><a class="J-del-project btn btn-default" href="">删除</a></td></tr>';
    }
    else{
      return '<tr><td>' + num + '</td><td class="filenamestd"></td><td class="filetimetd"></td><td class="filebytd"></td><td></td><td><a class="btn btn-primary up-btn">上传</a>  <input type="hidden" name="fileName" class="fileNameArr"/> <a class="J-del-project btn btn-default" href="">删除</a></td></tr>'; 
    }
  }

//新增表格
$('.panel-body').on('click', '.J_add_project', function () {
        var $tbody = $(this).parent().parent().find('table tbody');
        var num = $tbody.children().length + 1;
        $tbody.append(getTemp(num,1));
}).on('click', '.J-del-project', function (e) {
        $(this).closest('tr').remove();
        e.preventDefault();
});

//加载日期
$('input[date]').datetimepicker({
          format: 'yyyy-mm-dd',
          autoclose: true,
          minView: 2
});

//上传图片
$('#tab5').on('click', '.J_add_file', function () {
          var $tbody = $(this).parent().parent().find('table tbody');
          var ProcessNum = $tbody.children().length + 1;
          var $tmp = $(getTemp(ProcessNum,2));
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
              $btn.parent().parent().find('.filenamestd').html(filenames);
              //$btn.parent().parent().find('.filetimetd').html(filetime);
              $btn.parent().find('.fileNameArr').val(filenames);
          });
        }).on('click', '.J-del-number', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
});