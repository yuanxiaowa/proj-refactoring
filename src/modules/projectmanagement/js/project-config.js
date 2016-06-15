import render from 'render';
        var $addNumber = $('.J-add-number');
var $numContainer = $(".number-wrap-container");
var $removeItem = $(".del-item");
var $addItem = $('.J-add-item ');
var $itemName = $('.J-project-item-name');
var $removeNumber = $('.J-remove-number');
var $getVal = $(".j-modal-ok");
var $listBox = $('.list-box')
var _tpl = $$include('/partials/project-1');
var $tpl = $(_tpl);
var $formgroup = $('.form-group');
var $isAutoProject = $('.isAutoProject,.isAutoContact');
//增加各选项  
var itemArr = ['项目状态', '工程类别', '联系单位类型', '企业性质', '项目合同税率', '开票类型', '合同类型', '承包方式', '计价方式', '支付方式'];
var itemFieldArr = ['projectStatuses', 'projectTypes', 'associatedUnitTypes', 'enterpriseProperties', 'contractRates', 'invoiceTypes', 'contractTypes', 'contractingModes', 'pricingModes', 'paymentModes']
var iNum = '';
  function getTemp(tp) {
    var type = tp;
    if ( 1===type) {
      return '<tr>\n        <td><input type="text" name="paymentPhases[phaseName][]" class="form-control" /></td>\n             <td><input class="form-control" type="text" name="paymentPhases[defaultPaymentRate][]" /></td>\n              <td><select class="form-control" name="paymentPhases[correspondingProjectStatus][]"><option>开工</option><option>未开工</option></select></td>\n     <td>\n          <a class="J-del-contact" href="">删除</a>\n             </td>\n      </tr>';
    } else if (2 ===type ) {
      return '<tr>\n        <td><textarea rows="2" cols="30" name="contractTerms[]"class="form-control"></textarea></td>\n    <td>\n          <a class="J-del-contact" href="">删除</a>\n             </td>\n      </tr>';
    }
  }
//增加删除项目合同编号
$.each($numContainer, function (index, ele) {
  $(ele).on('click', '.J-add-number', function () {
    $(this).parent('.number-wrap-container').next('.number-container').append($tpl);
  }).on('click', '.J-remove-number', function () {
    var $item = $('.number-item');
    $item.remove();
  });
});


$.each($addItem, function (index, ele) {
  $(ele).on('click', function () {
    iNum = index;
    $itemName.html(itemArr[index])//动态设置弹出框对应的选项
    $itemName.next().find('.item-val').attr('name', itemFieldArr[index]);
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
          var inpName = item.prop('name');
          var inpHtml = '<input type="hidden" name="' + inpName + '" value="' + itemV + '">';
          var html = '<div class="project-item">' + inpHtml + itemV + '<em class="del-item">×</em>' + '</div>';
          $listBox.eq(iNum).children($addItem).last().before(html);
          $('#add-item').modal('hide');
          item.val('');
        });
//删除各选项
$listBox
        .on('click', '.del-item', function () {
          $(this).parent().remove();
        });

//新增合同相关
$formgroup
        .on('click', '.payProcess', function () {
          var $tbody = $(this).prev().find('table tbody');
          $tbody.append(getTemp(1));
        }).on('click', '.J-del-contact', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
        })
         .on('click', '.contactContent', function () {
          var $tbody = $(this).prev().find('table tbody');
          $tbody.append(getTemp(2));
        }).on('click', '.J-del-contact', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
        });

