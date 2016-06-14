import Dialog from 'dialog';

function OptionManager(options) {
  if (!options.urlSubmit) {
    options.urlSubmit = options.url;
  }
  this.options = $.extend({
    onSubmited: $.noop
  }, options);
  this.init();
}

OptionManager.getTemplate = (placeholder, rightTitle) => {
  return $$include('/partials/option-manager.html');
};

OptionManager.getDialog = (options, onOk) => {
  let dialog = new Dialog({
    title: options.title,
    content: OptionManager.getTemplate(options.placeholder, options.rightTitle),
    btns: Dialog.BTNOKCANCEL,
    onOk
  });
  return dialog;
};

OptionManager.getRItem = item => {
  return `<li><label><input type="checkbox" value="${item.value}">${item.text}</label></li>`;
};

OptionManager.prototype = {
  constrctor: OptionManager,
  init() {
    this.options.$btn.on('click', () => {
      if (!this.dialog) {
        this.dialog = OptionManager.getDialog(this.options, () => {
          this.submitData(this.roles.getResult())
            .then(result => {
              if (result.success) {
                this.dialog.hide();
                this.options.onSubmited();
              } else {
                $.alert(result.msg);
              }
            });
        });
        this.bindEvents();
        $.ajax({
            url: this.options.url,
            dataType: 'json'
          })
          .then(result => {
            if (result.success) {
              this.roles.setData(result.data);
            }
          });
      } else {
        this.dialog.show();
      }
      return false;
    });
  },
  bindEvents() {
    var $body = this.dialog.getBody();
    this.roles = function($body) {
      var $eles = $body.find('.panelm-w');
      var $left = $eles.eq(0);
      var $right = $eles.eq(1);

      $body.on('click', '.j-role-a', () => {
          $left.find('input:checked').closest('li')
            .appendTo($right);
        })
        .on('click', '.j-role-aa', () => {
          $left.children().appendTo($right);
        })
        .on('click', '.j-role-r', () => {
          $right.find('input:checked').closest('li')
            .appendTo($left);
        })
        .on('click', '.j-role-ra', () => {
          $right.children().appendTo($left);
        });
      return {
        setData(data) {
          var left = $.map(data.left, OptionManager.getRItem);
          var right = $.map(data.left, OptionManager.getRItem);
          $left.html(left.join(''));
          $right.html(right.join(''));
        },
        getResult() {
          var datas = [];
          $right.find('input').each((k, item) => {
            datas.push(item.value);
          });
          return datas;
        }
      };
    }($body);

    $body
      .find('form')
      .on('submit', () => {
        return false;
      })
      .find('button')
      .tooltip();
  },
  submitData(data) {
    return $.ajax({
      url: this.options.urlSubmit,
      dataType: 'json',
      type: 'post',
      data: JSON.stringify(data)
    });
  }
};

export default OptionManager;