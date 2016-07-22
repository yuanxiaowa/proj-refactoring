/*
* @Author: huangzexia
* @Date:   2016-07-15 16:18:10
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-15 16:20:15
*/
import 'bootstrapDatetimepicker';
import webUploader from 'webUploader';
import 'kindeditor';
import 'kindeditor.china';
//-------------------引入编辑器--------------
KindEditor.ready(function(K) {
    window.editor = K.create('#editor',
                            {
                              uploadJson : '../jsp/upload_json.jsp'
                            }
                            );
});
//------------------------时间引入----------------
$('input[date]').datetimepicker(
	{
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: 2
    }
	);
//------------------------上传图片----------------
var $btn = $('.upFile-btn');
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
var $filep = $('.filehelp-p');
uploader.on('uploadSuccess', function(file, response) {
			$filep.find('.show_a').html(response.name);
            $filep.find('.urltmp').val(response.path);
            $filep.find('.sizetmp').val(response.size);
            $filep.find('.typetmp').val(response.type);
            $filep.find('.nametmp').val(response.name);
});
//------------------------置顶------------------------
$('.setTop').on('click', function() {
	if( $(this).val() == 1) {
		$('.up-date').removeClass('hidden');
	}else {
		$('.up-date').addClass('hidden');
	}
})