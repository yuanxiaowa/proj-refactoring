import render from 'render';
import formValidation from 'formValidation';
import Dialog from 'dialog';
// 渲染详细信息
render({
    url: 'data/project_config'
  }).then(function(data) {

var $addNumber = $('.J-add-number');
var $numContainer = $('.number-wrap-container');
var $removeItem = $('.del-item');
var $addItem = $('.J-add-item ');
var $itemName = $('.J-project-item-name');
var $removeNumber = $('.J-remove-number');
var $listBox = $('.list-box');
var $autobox = $('.auto_box');
var $formgroup = $('.form-group');
var $isAutoProject = $('.isAutoProject,.isAutoContact');
var $autocheck = $('.J-add-auto');
var $increaseNum = $('.increase-num');
//增加各选项  
var itemArr = ['项目状态', '工程类别', '联系单位类型', '企业性质', '项目合同税率', '开票类型', '合同类型', '承包方式'];
var itemFieldArr = ['projectStatuses', 'projectTypes', 'associatedUnitTypes', 'enterpriseProperties', 'contractRates', 'invoiceTypes', 'contractTypes', 'contractingModes'];
var iNum, iautoNum ='';
var icontactContentNum = $('.contactContent').prev().find('table tbody').children().length;
var itemAutoArr = ['分公司编号', '固定编号', '年月'];
var $addSave = $('.J-add-save');
var $form = $('#add-pro-detail-form');
var $autoNo = $('.J-add-auto_no');
var $autohtNo = $('.J-add-auto_htno');
//保存/提交数据
$addSave
  .on('click', () => {
    $form.submit();
    $.alert('保存成功!');
});
//新增一行
  function getTemp(inums ,tp) {
    var type = tp;
    if ( 1===type) {
      return '<tr><td><input type="text" name="paymentPhases['+inums+'].phaseName" class="form-control" /></td><td><input class="form-control" type="text" name="paymentPhases['+inums+'].defaultPaymentRate" /></td><td><select class="form-control" name="paymentPhases['+inums+'].correspondingProjectStatus"><option>开工</option><option>未开工</option></select></td><td><a class="J-del-contact" href="">删除</a></td></tr>';
    } else if (2 ===type ) {
      return '<tr><td><textarea rows="2" cols="30" name="contractTerms"class="form-control"></textarea></td><td><a class="J-del-contact" href="">删除</a></td></tr>';
    }
  } 

//新增编号
$autoNo.on('click', function() {
      var shOption = [];
      var $thisone = $(this).parent();
      $thisone.find('input[type="hidden"][name="projectNoCreationRules"]').each(function(){
        shOption.push($(this).val());
      });
      $.each(itemAutoArr,function() {
          if( $.inArray(this, shOption)>-1 ) {
            $('.bh_no option[value="'+this+'"]').remove();
           }else {
            if( $('.bh_no option[value="'+this+'"]').length  == 0 )
            {
              $('.bh_no').append('<option value="' + this + '">' + this + '</option>');
            }
           }
       });
      $('#addno-item').modal('show');
});
//新增合同编号
$autohtNo.on('click', function() {
      var shOption = [];
      var $thisone = $(this).parent();
      $thisone.find('input[type="hidden"][name="contractNoCreationRules"]').each(function(){
        shOption.push($(this).val());
      });
      $.each(itemAutoArr,function() {
          if( $.inArray(this, shOption)>-1 ) {
            $('.ht_no option[value="'+this+'"]').remove();
           }else {
            if( $('.ht_no option[value="'+this+'"]').length  == 0 )
            {
              $('.ht_no').append('<option value="' + this + '">' + this + '</option>');
            }
           }
       });
      $('#addhtno-item').modal('show');
});
//新增模块配置
$.each($addItem, function (index, ele) {
  $(ele).on('click', function () {
    iNum = index;
    $itemName.html(itemArr[index]);//动态设置弹出框对应的选项
    $itemName.next().find('.item-val').attr('name', itemFieldArr[index]);
     $itemName.next().find('.item-val').removeAttr('data-type');
     $itemName.next().find('.item-val').parent().find('span').remove();
     if('contractRates' ==  itemFieldArr[index]) 
     {
       $itemName.next().find('.item-val').attr('range', '[0,1]');
       $itemName.next().find('.item-val').parent().append('<span>(请输入小数或者百分数)</span>');
     }
    $('#add-item').modal('show');
  });
});
//自动选择按钮
$isAutoProject.on('click', function () {
          if ($(this).is(':checked')) {
            $(this).parents('.form-group').next().addClass('hidden');
          } else {
            $(this).parents('.form-group').next().removeClass('hidden');
          }
        });
//获取各项输入的值,放入页面
$('#add-item').on('click', '.j-modal-ok', function () {
          var item = $('.item-val');
          var itemV = item.val();
          var inpName = item.attr('name');
          var inpHtml = '<input type="hidden" name="'+inpName+'" value="' + itemV + '">';
          var html = '<div class="project-item">' + inpHtml + itemV + '<em class="del-item">×</em></div>';
          $listBox.eq(iNum).children($addItem).last().before(html);
          $('#add-item').modal('hide');
          item.val('');
});
//编号
$('#addno-item').on('click', '.j-modal-ok', function () {
          var selectval = $('.bh_no').find("option:selected").val();
          if( selectval )
          {
              var  inpHtml = '<input type="hidden" name="projectNoCreationRules" class="form-group" value="' + selectval + '">';
              if(selectval =='固定编号') {
                  inpHtml += '<input type="text" name="projectNoCreationRules">';
              }
              var html = '<div class="project-item pull-left">'+ selectval + inpHtml  + '<em class="del-item">×</em></div>';
              $autobox.eq(iautoNum).children($increaseNum).first().before(html);
          }
          $('#addno-item').modal('hide');
});
//合同编号
$('#addhtno-item').on('click', '.j-modal-ok', function () {
          var selectval = $('.ht_no').find("option:selected").val();
          if( selectval )
          {
              var  inpHtml = '<input type="hidden" name="contractNoCreationRules" class="form-group" value="' + selectval + '">';
              if(selectval =='固定编号') {
                  inpHtml += '<input type="text" name="contractNoCreationRules">';
              }
              var html = '<div class="project-item pull-left">'+ selectval + inpHtml  + '<em class="del-item">×</em></div>';
              $(".J-add-auto_htno").parent().children($increaseNum).first().before(html);
          }
          $('#addhtno-item').modal('hide');
});
//删除各选项
$listBox.on('click', '.del-item', function () {
          $(this).parent().remove();
});
$autobox.on('click', '.del-item', function () {
          $(this).parent().remove();
});

//新增合同相关
$formgroup.on('click', '.contactContent', function () {
          var $tbody = $(this).prev().find('table tbody');
          $tbody.append(getTemp(icontactContentNum,2));
           icontactContentNum++;
        }).on('click', '.J-del-contact', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
        });
});