/**
 * 弹框
 */

/*eslint no-param-reassign:0*/
/*eslint complexity:0 */

function Dialog({
  title = '温馨提示',
  content,
  size,
  btns,
  btnsTxt,
  remote,
  tplFooter,
  backdrop = 'static',
  onOk = $.noop,
  onCancel = $.noop
}) {
  this.options = {
    content,
    title,
    size,
    btns,
    btnsTxt,
    remote,
    tplFooter,
    backdrop,
    onOk,
    onCancel
  };
  this.events = [];
  this.init();
}

Dialog.HOOKOK = '.j-modal-ok';

Dialog.BTNOK = 2;
Dialog.BTNCANCEL = 1;
Dialog.BTNOKCANCEL = Dialog.BTNOK | Dialog.BTNCANCEL;

Dialog.SIZENORMAL = '';
Dialog.SIZELG = 'modal-lg';
Dialog.SIZESM = 'modal-sm';

Dialog.getModal = (content = '正在加载中...', msize = Dialog.SIZENORMAL) => {
  return $$include('/partials/modal');
};

Dialog.getFooter = (btns = Dialog.BTNOK, btnsText) => {
  if (!btns) {
    return '';
  }
  let tpl = '<div class="modal-footer">';
  if (true === btns) {
    tpl += btnsText;
  } else {
    btns = +btns;
    if (!btnsText) {
      btnsText = {};
    }
    let stxt = btnsText.stxt ? btnsText.stxt : '保存';
    let ctxt = btnsText.ctxt ? btnsText.ctxt : '取消';
    if ((btns & Dialog.BTNOK) === Dialog.BTNOK) {
      tpl += `<button class="btn btn-primary j-modal-ok">${stxt}</button>`;
    }
    if ((btns & Dialog.BTNCANCEL) === Dialog.BTNCANCEL) {
      tpl += `<button class="btn btn-default" data-dismiss="modal">${ctxt}</button>`;
    }
  }
  tpl += '</div>';
  return tpl;
};

Dialog.getHeader = title => {
  return `
    <div class="modal-header">
      <button class="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
      <span class="j-modal-title">${title}</span>
    </div>
  `;
};

Dialog.prototype = {
  constructor: Dialog,
  init() {
    var $modal = $(Dialog.getModal(this.options.content, this.options.size));
    var $c = $modal.find('.modal-content');
    if (this.options.title) {
      $c.prepend(Dialog.getHeader(this.options.title));
    }
    if (false !== this.options.btns) {
      if (this.options.tplFooter) {
        $c.append(Dialog.getFooter(true, this.options.tplFooter));
      } else {
        $c.append(Dialog.getFooter(this.options.btns, this.options.btnsTxt));
      }
    }
    $modal.appendTo('body');
    $modal.modal({
      backdrop: this.options.backdrop,
      show: false
    });
    this.$modal = $modal;
    this.bindEvents();
    if (this.options.remote) {
      this.load(this.options.remote);
    }
    setTimeout(() => {
      this.trigger('inited.dialog');
    });
  },
  on(type, handle) {
    if (!this.events[type]) {
      this.events[type] = [handle];
    } else {
      this.events[type].push(this.events[type]);
    }
  },
  trigger(type) {
    var self = this;
    if (this.events[type]) {
      $.each(this.events[type], function() {
        this.call(self, self.$modal);
      });
    }
  },
  bindEvents() {
    this.$modal
      .on('click', '.j-modal-ok', () => {
        if (false === this.options.onOk()) {
          return;
        }
        this.hide();
      })
      .on('hidden.bs.modal', this.options.onCancel)
      .on('shown.bs.modal', () => {
        this.trigger('shown.dialog');
      });
  },
  load(url) {
    $.get(url, data => {
      this.getBody().html(data);
      this.trigger('loaded.dialog');
    });
  },
  setContent(data) {
    this.getBody().html(data);
  },
  setTitle(title) {
    this.$modal.find('.j-modal-title').text(title);
  },
  getBody() {
    return this.$modal.find('.modal-body');
  },
  show() {
    this.$modal.modal('show');
  },
  hide() {
    this.$modal.modal('hide');
  }
};

$.alert = (msg, title) => {
  var $dtd = $.Deferred();
  let alert = $.alert.queue.pop();
  if (!alert) {
    alert = new Dialog({
      content: `<div class="text-center">${msg}</div>`,
      onOk: $dtd.resolve,
      title,
      btnsTxt: {
        stxt: '确定'
      },
      backdrop: true,
      onCancel() {
        $.alert.queue.push(alert);
      }
    });
  } else {
    alert.setTitle(title);
    alert.setContent(msg);
  }
  alert.show();
  return $dtd.promise();
};

$.alert.queue = [];

$.confirm = (msg, title) => {
  var $dtd = $.Deferred();
  var alert = new Dialog({
    content: `<div class="text-center">${msg}</div>`,
    title,
    onOk: $dtd.resolve,
    onCancel: $dtd.reject,
    btns: Dialog.BTNOKCANCEL,
    btnsTxt: {
      stxt: '确定'
    },
    backdrop: true
  });
  alert.show();
  return $dtd.promise();
};

export default Dialog;