/*
* @Author: huangzexia
* @Date:   2016-06-15 14:05:03
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-22 14:29:17
*/
import webUploader from 'webUploader';
import 'bootstrapDatetimepicker';
import Linkage from 'linkage';
import 'toggle';

//上传图片
var uploader = webUploader.create({
    auto: true,
    swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
    pick: '.upFile-btn',
    server: 'url',
    accept: {
    extensions: 'gif,jpg,jpeg,bmp,png',
    mimeTypes: 'image/*'
    }
   });
//引入时间
$('input[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});
//工程地点
var id = $('select.region').find("option:selected").val()?$('select.region').find("option:selected").val():1;
new Linkage({
  url: 'data/add_project',
  $eles: $('select.region'),
  id: id,
  initData: [1, 4, 5]
});  