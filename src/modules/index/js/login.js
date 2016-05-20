/*global $:true*/

$('#form-login').validate({
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
    console.log(form);
    return true;
  }
});