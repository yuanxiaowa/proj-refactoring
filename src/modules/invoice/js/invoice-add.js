/*
* @Author: huangzexia
* @Date:   2016-07-04 15:10:24
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-04 15:10:41
*/
import 'bootstrapDatetimepicker';
import TableEdit from 'tableEdit';
import webUploader from 'webUploader';

//------------------------时间引入----------------
$('input[date]').datetimepicker(
  {
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
  }
);

 var $tblist = $('.table');
  var te = new TableEdit({
    $table: $tblist,
    $btnAdd: '.add',
    prefix: 'temparr',
    columns: [{
      type: 'genNum'
    }, {
      type: 'select',
      name: 'purchasePlanDetailId'
    }, {
      type: 'select',
      name: 'materialId',
      data:  ['普通发票 ','电子发票']
    }, {
      data: '筑牛网'
    }, {
       type: 'input',
      name: 'materialName'
    }, {
      type: 'select',
      name: 'measurementUnit',
      data:  ['17%','21%']
    }, {
      type: 'input',
      name: 'arrivalPlanDate',
      attrs: {
        date: true
      }
    }, {
      type: 'input',
      name: 'quantity'
    }, {
      type: 'input',
      name: 'lowUnitPrice'
    }, {
      type: 'input',
      name: 'highUnitPrice'
    }, {
      type: 'input',
      name: 'remark',
      formatter(name, index, value){
          return '<input type="text" name="'+name+'" date="true"  class="form-control">';
      }
    }, {
      name: 'fileNo',
      formatter(name, index, value){
          return '<span class="tempnameshow"></span><a href="javascript:;" class="btn btn-primary upFile">上传</a><input type="hidden" class="tempname" name="temparr['+index+'].'+name+'">';
      }
    }, {
      name: 'contactPhone',
      formatter(name, index, value){
          return '<input type="checkbox" name="'+name+'"  >';
      }
    }, {
      type: 'input',
      name: 'remark',
      formatter(name, index, value){
          return '<input type="text" name="'+name+'" date="true"  class="form-control">';
      }
    },{
      name: 'remark11',
      formatter(name, index, value){
          return '<textarea  name="'+name+'" class="form-control"></textarea>';
      }
    }, {
      type: 'delBtn',
      name: ''
    }]
  });

te.on('trAdded',function( $obj ){
    var $btn = $obj.find('.upFile');
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
    uploader.on( 'uploadSuccess',function(file,response ){
                  var filenames =  response.filename;//文件名|路径
                  $obj.find('.tempnameshow').html(filenames);
                  $obj.find('.tempname').val(filenames);
    });

    $obj.find('input[date]').datetimepicker(
    {
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
    });
});

 
