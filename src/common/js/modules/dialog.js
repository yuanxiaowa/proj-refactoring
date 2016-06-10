/*eslint no-param-reassign:0*/
/*eslint complexity:0 */

function Dialog({
  title = '温馨提示',
  content,
  btns,
  btnsTxt,
  remote,
  backdrop = 'static',
  cb = $.noop
}) {
  this.options = {
    content,
    b: 1,
    title,
    btns,
    btnsTxt,
    remote,
    backdrop,
    cb
  };
  this.events = [];
  this.init();
}

Dialog.HOOKOK = '.j-modal-ok';

Dialog.BTNOK = 2;
Dialog.BTNCANCEL = 1;
Dialog.BTNOKCANCEL = Dialog.BTNOK | Dialog.BTNCANCEL;

Dialog.getModal = (content = '正在加载中...') => {
  return `
    <div class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">${content}</div>
        </div>
      </div>
    </div>
  `;
};

Dialog.getFooter = (btns = Dialog.BTNOK, {
  stxt = '保存',
  ctxt = '取消'
}) => {
  if (!btns) {
    return '';
  }
  btns = +btns;
  let tpl = '<div class="modal-footer">';
  if ((btns & Dialog.BTNOK) === Dialog.BTNOK) {
    tpl += `<button class="btn btn-primary j-modal-ok">${stxt}</button>`;
  }
  if ((btns & Dialog.BTNCANCEL) === Dialog.BTNCANCEL) {
    tpl += `<button class="btn btn-default" data-dismiss="modal">${ctxt}</button>`;
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
      ${title}
    </div>
  `;
};

Dialog.prototype = {
  constructor: Dialog,
  init() {
    var $modal = $(Dialog.getModal(this.options.content));
    var $c = $modal.find('.modal-content');
    if (this.options.title) {
      $c.prepend(Dialog.getHeader(this.options.title));
    }
    if (false !== this.options.btns) {
      $c.append(Dialog.getFooter(this.options.btns, this.options.btnsTxt));
    }
    $modal.appendTo('body');
    $modal.modal({
      backdrop: this.options.backdrop
    });
    this.$modal = $modal;
    this.bindEvents();
    if (this.options.remote) {
      this.load(this.options.remote);
    }
    setTimeout(() => {
      this.trigger('inited');
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
        if (false === this.options.cb()) {
          return;
        }
        this.hide();
      });
  },
  load(url) {
    this.$modal.find('.modal-body')
      .load(url, () => {
        this.trigger('loaded');
      });
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
  var alert = new Dialog({
    content: `<div class="text-center">${msg}</div>`,
    cb: $dtd.resolve,
    title,
    btnsTxt: {
      stxt: '确定'
    },
    backdrop: true
  });
  alert.show();
  return $dtd.promise();
};

$.confirm = (msg, title) => {
  var $dtd = $.Deferred();
  var alert = new Dialog({
    content: `<div class="text-center">${msg}</div>`,
    title,
    cb: $dtd.resolve,
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