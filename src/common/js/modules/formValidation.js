import 'jqueryValidate';
import 'jqueryForm2json';

$.ajaxSettings.Accept = 'application/json';
$.ajaxSettings['Content-Type'] = 'application/json';
let defaultOptions = {
  errorClass: 'help-block',
  validClass: 'help-block',
  highlight(element) {
    $(element).closest('.form-group').addClass('has-error').removeClass('has-success');
  },
  unhighlight(element) {
    $(element).closest('.form-group').addClass('has-success').removeClass('has-error');
  },
  errorPlacement($error, $element) {
    $element.closest('.form-group').append($error);
  },
  submitHandler(form) {
    $.ajax({
        url: form.action,
        type: form.method,
        data: this.settings.dataFormat(form)
      })
      .success($.proxy(this.settings.onSubmitSuccess, form))
      .error(this.settings.onSubmiteError);
    return false;
  },
  dataFormat(form) {
    if (/post/i.test(form.method)) {
      return JSON.stringify($(form).form2json());
    }
    return $(form).serialize();
  }
};

export default function($form, _options) {
  var options = $.extend(defaultOptions, _options);
  return $form.validate(options);
}