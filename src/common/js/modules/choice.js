import 'bootstrapDatetimepicker';
import 'bootstrapTable';
import Dialog from 'dialog';

function Choice(_options) {
  this.options = _options;
  this.init();
}

Choice.COMPANY = 1;
Choice.AGREEMENT = 1;
Choice.COMPANY = 1;

Choice.prototype = {
  constructor: Choice, 
  init() {
    var dialog = new Dialog({
      title: '联系单位选择',
      content: $$include('/partials/choice-purchase'),
      size: Dialog.SIZELG,
      btnsTxt: {
        stxt: '确定'
      }
    });
    this.dialog = dialog;
    this.bindEvent();
  },
  bindEvent() {
    this.dialog.on('inited.dialog', () => {
      this.dialog.getBody().find('[date]').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: 2
      });
    });
  },
  show() {
    this.dialog.show();
  }
};

export default Choice;