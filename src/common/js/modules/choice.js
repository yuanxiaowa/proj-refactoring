import 'bootstrapDatetimepicker';
import 'bootstrapTable';
import 'jqueryForm2json';
import Dialog from 'dialog';

function Choice(_options) {
  var o = Choice.OPTIONS[_options.type];
  this.options = $.extend({
    onSelected: $.noop,
    onInited: $.noop
  }, _options);
  this.optionDialog = $.extend({
    remote: _options.tplUrl,
    size: Dialog.SIZELG,
    btnsTxt: {
      stxt: '确定'
    },
    onOk: () => {
      this.options.onSelected.call(this, this.$table.bootstrapTable('getAllSelections'));
    }
  }, o.dialog);
  if(_options.type == Choice.COMPANY){
    this.optionDialog.tplFooter ='<button class="btn btn-primary j-modal-ok">确定</button><button class="btn btn-default j-add-conpany">新增联系单位</button>';
  }
  this.optionColumns = o.columns;
  this.init();
}

Choice.COMPANY = 0;
Choice.AGREEMENT = 1;
Choice.PURCHASE = 2;
Choice.MATERIAL = 3;

Choice.OPTIONS = [{
  dialog: {
    title: '联系单位选择'
  },
  columns: [{
    radio: true,
    title: '选中'
  }, {
    field: '',
    title: '编号'
  }, {
    field: '',
    title: '单位名称'
  }, {
    field: '',
    title: '单位类型'
  }, {
    field: '',
    title: '单位地址'
  }, {
    field: '',
    title: '法定代表人'
  }, {
    field: '',
    title: '企业性质'
  }, {
    field: '',
    title: '营业执照'
  }]
}, {
  dialog: {
    title: '合同选择',
    size: Dialog.SIZELG
  },
  columns: [{
    radio: true,
    title: '选中'
  }, {
    field: '',
    title: '编号'
  }, {
    field: '',
    title: '合同'
  }, {
    field: '',
    title: '合同类别'
  }, {
    field: '',
    title: '施工单位'
  }, {
    field: '',
    title: '项目简称'
  }, {
    field: '',
    title: '总包方'
  }, {
    field: '',
    title: '合同总额（含增补）'
  }, {
    field: '',
    title: '税率'
  }, {
    field: '',
    title: '项目负责人'
  }, {
    field: '',
    title: '施工城市'
  }, {
    field: '',
    title: '是否归档'
  }]
}, {
  dialog: {
    title: '项目选择'
  },
  columns: [{
    radio: true,
    title: '选中'
  }, {
    field: '',
    title: '编号'
  }, {
    field: '',
    title: '项目名称'
  }, {
    field: '',
    title: '项目编号'
  }, {
    field: '',
    title: '项目负责人'
  }, {
    field: '',
    title: '项目状态'
  }, {
    field: '',
    title: '建设单位'
  }, {
    field: '',
    title: '施工单位'
  }, {
    field: '',
    title: '工程地点'
  }, {
    field: '',
    title: '合同总额'
  }]
}, {
  dialog: {
    title: '材料合同选择'
  },
  columns: [{
    radio: true,
    title: '选中'
  }, {
    field: '',
    title: '编号'
  }, {
    field: '',
    title: '所属部门'
  }, {
    field: '',
    title: '所属项目'
  }, {
    field: '',
    title: '合同名称'
  }, {
    field: '',
    title: '合同编号'
  }, {
    field: '',
    title: '对应采购单'
  }, {
    field: '',
    title: '供应商'
  }, {
    field: '',
    title: '材料类型'
  }, {
    field: '',
    title: '合同总额'
  }, {
    field: '',
    title: '创建日期'
  }, {
    field: '',
    title: '审批状态'
  }]
}];

Choice.prototype = {
  constructor: Choice,
  init() {
    var dialog = new Dialog(this.optionDialog);
    this.dialog = dialog;
    this.bindEvent();
  },
  bindEvent() {
    this.dialog
      .on('loaded.dialog', () => {
        var $body = this.dialog.getBody();
        var $table = this.$table = $body.find('table');
        var $form = $body.find('form');
        $body.find('[date]').datetimepicker({
          format: 'yyyy-mm-dd',
          autoclose: true,
          minView: 2
        });
        $form.on('submit', () => {
          $table.bootstrapTable('refresh');
          return false;
        });
        $table.bootstrapTable({
          url: this.options.url,
          clickToSelect: true,
          checkboxHeader: false,
          pagination: true,
          method: 'post',
          sidePagination: 'server',
          queryParams(params) {
              $.extend(params, $form.form2json(), {pageNo: params.offset});
              return params;
          },
          responseHandler: res => res.data,
          columns: this.optionColumns
        });
        this.options.onInited($form);
      });
  },
  show() {
    this.dialog.show();
  }
};

export default Choice;