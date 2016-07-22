/*
* @Author: huangzexia
* @Date:   2016-07-15 10:27:25
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-18 15:51:20
*/
import TableEdit from 'tableEdit';
import 'trfileUpload';
import 'bootstrapDatetimepicker';
import 'kindeditor';
import 'kindeditor.china';

var $changeContainer = $('#change-container');
var $getContainer =$('.get-container');
var $change = $('.change');

//------------------发文-------------------
fawen_helper();

//-------------------引入编辑器--------------
KindEditor.ready(function(K) {
    window.editor = K.create('#editor',{
      uploadJson : '../jsp/upload_json.jsp',
        fileManagerJson : '../jsp/file_manager_json.jsp',
        allowFileManager : true
    });
});

//-------------------不太文本类型的切换--------------
$change.on('change',function(){
  var val = $(this).val();
  if(val == 0){
    $changeContainer.html('');
    $.get("_fawen.html","",function(data) {
        $changeContainer.html(data);
        fawen_helper();//发文
    },'html');
  }else if(val == 1) {
    $.get("_shouwen.html","",function(data){
      $changeContainer.html(data);
      shouwen_helper();//收文
    },'html');
  }else if(val== 8){
    $changeContainer.html('');
    $.get("_jiyao.html","",function(data){
      $changeContainer.html(data);
      hyjy_helper();//会议纪要
    },'html');
  }else{
    $changeContainer.html('');
    $.get("_default.html","",function(data){
      $changeContainer.html(data);
    },'html');
  }
})

function add(obj){
  $(obj).click(function(){
    $('#add-item').modal('show');
  })
}

//发文
function fawen_helper() {
        //接收对象table list
        var $tblist = $('.fawen_1_table');
        var te = new TableEdit({
          $table: $tblist,
          $btnAdd: '.add',
          prefix: 'arrs',
          columns: [{
            type: 'genNum'
          }, {
            type: 'select',
            name: 'temp1',
            data:  ['财务部 ','工程部']
          }, {
            type: 'select',
            name: 'temp2',
            data:  ['财务部 ','工程部']
          },{
            type: 'delBtn',
            name: ''
          }]
        });
}
//收文
function shouwen_helper() {
  //加日期控件
  $('input[date]').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: 2
    });
  //新增人员
  $('.add-people').click(function(){
      $('#add-item').modal('show');
  });
  //新增人员
  var peopleapphtml = '';
  $('.j-modal-ok').on('click' , function() {
        var item_people = $(this).parents('#add-item').find('.item-val').val(); 
        peopleapphtml = '<div class="item"><input type="hidden" value="'+item_people+'">'+item_people+'<a class="dell" href="javascript:;">×</a></div>';
        $('#list-container').append(peopleapphtml);
         $('#add-item').modal('hide');
      });
 //删除人员
  $('#list-container').on('click', '.dell', function() {
        $(this).parent().remove();
  })
}
//会议纪要
function hyjy_helper() {
   shouwen_helper();
}