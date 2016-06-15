import formValidation from 'formValidation';
import Dialog from 'dialog';

// 绑定加载模态对话框事件
$('body').on('click', '[data-modal-load]', function() {
  var $self = $(this);

  if (!$self.data('loaded') || $self.data('nocache')) {
    let stxt = $self.data('modalStxt');
    let ctxt = $self.data('modalCtxt');
    let abind = $self.data('modalBind');
    let btns = 0;
    if ((stxt || undefined === stxt) && ctxt) {
      btns = Dialog.BTNOKCANCEL;
    } else if (stxt || undefined === stxt) {
      btns = Dialog.BTNOK;
    }
    let dialog = new Dialog({
      remote: $self.data('modalLoad'),
      title: $self.data('modalTitle'),
      btns: btns,
      btnsTxt: {
        stxt,
        ctxt
      },
      onOk() {
        var $form = dialog.$modal.find('form');
        if ($form.length) {
          $form.submit();
        }
        $self.trigger('ok.modalremote');
        return false;
      }
    });
    dialog.on('inited.dialog', () => {
      dialog.show();
    });
    dialog.on('loaded.dialog', () => {
      $self.data('loaded', true);
      let $form = dialog.$modal.find('form');
      if ('false' !== abind && $form.length) {
        $self.data('form', $form);
        formValidation($form, {
          onSubmitSuccess(data) {
            // 发送密码回掉
            // 隐藏对话框
            if (data.success) {
              dialog.hide();
            } else {
              $.alert(data.msg);
            }
          },
          errorPlacement($error, $element) {
            $element.parent().append($error);
          }
        });
      }
      $self.trigger('loaded.modalremote');
    });
    $self.data('dialog', dialog);
  } else {
    $self.data('dialog').show();
  }
  return false;
});
