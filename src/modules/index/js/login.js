import formValidation from 'formValidation';

var $errorArea = $('#error-area');
var $form = $('#form-login');

formValidation($form, {
  rules: {
    code: {
      remote: {
        url: 'data/verify',
        type: 'post',
        dataFilter(res) {
          let data = $.parseJSON(res);
          return data.success;
        }
      }
    }
  },
  // 数据请求完之后
  onSubmitSuccess(data) {
    if (!data.success) {
      $errorArea.html(`登录失败:${data.msg}`).removeClass('hidden');
    } else {
      $errorArea.addClass('hidden');
      window.location.href = 'main.html';
    }
  }
});
$form.on('input', () => {
  $errorArea.addClass('hidden');
});