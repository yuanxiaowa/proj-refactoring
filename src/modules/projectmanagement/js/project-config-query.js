import render from 'render';
import formValidation from 'formValidation';
import Dialog from 'dialog';

var $addNumber = $('.J-add-number');
var $numContainer = $('.number-wrap-container');
var $removeItem = $('.del-item');
var $addItem = $('.J-add-item ');
var $itemName = $('.J-project-item-name');
var $removeNumber = $('.J-remove-number');
var $getVal = $('.j-modal-ok');
var $listBox = $('.list-box');
var $autobox = $('.auto_box');
var _tpl = $$include('/partials/project-1');
var $tpl = $(_tpl);
var $formgroup = $('.form-group');
var $isAutoProject = $('.isAutoProject,.isAutoContact');
var $autocheck = $('.J-add-auto');
var $increaseNum = $('.increase-num');
//增加各选项  
var itemArr = ['项目状态', '工程类别', '联系单位类型', '企业性质', '项目合同税率', '开票类型', '合同类型', '承包方式', '计价方式', '支付方式'];
var itemFieldArr = ['projectStatuses', 'projectTypes', 'associatedUnitTypes', 'enterpriseProperties', 'contractRates', 'invoiceTypes', 'contractTypes', 'contractingModes', 'pricingModes', 'paymentModes'];
var iNum, iautoNum ='';
var ipayProcessNum = $(".payProcess").prev().find('table tbody').children().length;
var icontactContentNum = $(".contactContent").prev().find('table tbody').children().length;
var itemAutoArr = ['递增编号', '递增编号'];
var itemAutoFieldArr = ['projectNoCreationRules', 'contractNoCreationRules'];
var $addSave = $('.J-add-save');
var $form = $('#add-pro-detail-form');
// 保存/提交数据
var validator = formValidation($form, {
  onSubmiteError(error) { 
    $.alert('提交失败!');
    return;
 }
});
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

$.each($autocheck, function (index, ele) {
   $(ele).on('click', function () {
     iautoNum = index;
    $itemName.html(itemAutoArr[index]);//动态设置弹出框对应的选项
    $itemName.next().find('.item-val').attr('name', itemAutoFieldArr[index]);
    $itemName.next().find('.item-val').attr('data-type', 1);
    $('#add-item').modal('show');
  });
});
$.each($addItem, function (index, ele) {
  $(ele).on('click', function () {
    iNum = index;
    $itemName.html(itemArr[index]);//动态设置弹出框对应的选项
    $itemName.next().find('.item-val').attr('name', itemFieldArr[index]);
     $itemName.next().find('.item-val').removeAttr('data-type');
    $('#add-item').modal('show');
  });
});
//自动选择按钮
$isAutoProject
        .on('click', function () {
          if ($(this).is(':checked')) {
            $(this).parents('.form-group').next().addClass('hidden');
          } else {
            $(this).parents('.form-group').next().removeClass('hidden');
          }
        });
// 获取各项输入的值,放入页面
$getVal
        .on('click', function () {
          var item = $('.item-val');
          var itemV = item.val();
          var inpName = item.attr('name');
          var inpHtml = '<input type="hidden" name="'+inpName+'" value="' + itemV + '">';
          var html = '<div class="project-item">' + inpHtml + itemV + '<em class="del-item">×</em></div>';
          var datatype = item.attr('data-type');
          if( 1 == datatype ) { 
             html = '<div class="project-item pull-left">' + inpHtml + itemV + '<em class="del-item">×</em></div>';
           $autobox.eq(iautoNum).children($increaseNum).first().before(html);
          }else{
            $listBox.eq(iNum).children($addItem).last().before(html);
          }
          $('#add-item').modal('hide');
          item.val('');
        });
//删除各选项
$listBox
        .on('click', '.del-item', function () {
          $(this).parent().remove();
        });
$autobox
        .on('click', '.del-item', function () {
          $(this).parent().remove();
        });

//新增合同相关
$formgroup
        .on('click', '.payProcess', function () {
         
          var $tbody = $(this).prev().find('table tbody');
          $tbody.append(getTemp(ipayProcessNum, 1));
          ipayProcessNum++;
        }).on('click', '.J-del-contact', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
        })
         .on('click', '.contactContent', function () {
          var $tbody = $(this).prev().find('table tbody');
          $tbody.append(getTemp(icontactContentNum,2));
           icontactContentNum++;
        }).on('click', '.J-del-contact', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
        });

// 渲染详细信息
render({
  projectStatuses:["未开工","结束","在建中"]

});