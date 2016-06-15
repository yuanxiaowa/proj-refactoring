import 'select2';
import 'modalRemote';
import WebUploader from 'webUploader';
import formValidation from 'formValidation';

var $desc = $('#desc').children().last();
var _tpl = $$include('/partials/partial-1');


var validator = (() => {
  var $form = $('form');
  var validator = formValidation($form);
  return {
    reValidate() {
      validator.destroy();
      validator = formValidation($form);
    }
  };
})();

window.uploader = WebUploader.create({
  auto: true,
  pick: '#ss',
  server: '',
  accept: {
    extensions: 'gif,jpg,jpeg,bmp,png',
    mimeTypes: 'image/*'
  }
});

uploader.on('fileQueued', () => {
  console.log('-------');
});

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
initSelect($('select'));

$desc
  .on('click', '.j-add', function() {
    var $tpl = $(_tpl);
    $desc.append($tpl);
    validator.reValidate();
    $tpl.find('select').select2();
  })
  .on('click', '.j-sub', function() {
    var $item = $(this).closest('.row');
    if (!$item.siblings().length) {
      return;
    }
    $item.remove();
  });