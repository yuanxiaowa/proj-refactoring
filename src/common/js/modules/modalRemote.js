import formValidation from 'formValidation';
import Dialog from 'dialog';

// 绑定加载模态对话框事件
$('body').on('click', '[data-modal-load]', function() {
  var $self = $(this);

  if (!$self.data('loaded')) {
    let stxt = $self.data('modalStxt');
    let ctxt = $self.data('modalCtxt');
    let btns = 0;
    if ((stxt || stxt === undefined) && ctxt) {
      btns = Dialog.BTNOKCANCEL;
    } else if (stxt || stxt === undefined) {
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
      cb() {
        var $form = $self.data('form');
        if ($form) {
          $form.submit();
          return false;
        }
        $self.trigger('ok');
      }
    });
    dialog.on('inited', () => {
      dialog.show();
    });
    dialog.on('loaded', () => {
      $self.data('loaded', true);
      let $form = dialog.$modal.find('form');
      if ($form.length) {
        $self.data('form', $form);
        formValidation($form, {
          done(data) {
            // 发送密码回掉
            // 隐藏对话框
            dialog.hide();
          },
          errorPlacement($error, $element) {
            $element.parent().append($error);
          }
        });
      }
      $self.trigger('loaded');
    });
    $self.data('dialog', dialog);
  } else {
    $self.data('dialog').show();
  }
  return false;
});
