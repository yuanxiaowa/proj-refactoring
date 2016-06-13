// require(jqueryValidate)
// require(select2,css)


import Dialog from '/modules/dialog';
import formValidation from '/modules/formValidation';
import render from '/modules/render';


// 保存/提交补充合同数据
var $addSave = $('.J-add-save');
var $sendBtn = $('.J-send');
var $form = $('#add-pact-form');
var validator = formValidation($form, {
  done() {
    $.alert('提交成功!');
  }
});

$addSave
  .on('click',() => {
    $.alert('保存成功!');
});

$sendBtn
  .on('click',() => {
    $form.submit();
});
 // 主合同选择 
function initSelect($ele) {
  $ele.select2({
    url: '',
    dataType: 'json',
    delay: 250,
    // 请求参数处理
    data(params) {
      return {
        key: params.term
      };
    },
    // 处理结果
    processResults(data, params) {
      return {
        results: data
      };
    }
  });
}
initSelect($('select').eq(0));
