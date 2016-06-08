// require(jqueryValidate)

import formValidation from '/modules/formValidation';

/*eslint complexity:0 */
formValidation($('#form-login'), {
  rules: {
    code: {
      remote: {
        type: 'post',
        dataType: 'json',
        dataFilter(data) {
          if (!(data && data.success)) {
            return false;
          }
          return true;
        }
      }
    }
  },
  // 数据请求完之后
  success(data) {
    if (!data.success) {
      $('#error_area').html('登录失败:' + data.msg);
      $('#error_area').show();
    } else {
      $('#error_area').hide();
      window.location.href = 'index.do';
    }
  }
});
