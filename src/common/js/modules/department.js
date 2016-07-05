import 'zTree';

function Department(options) {
  this.options = options;
  this.init();
}

Department.getTpl = () => {
  var $ele = $('<div>');
  $ele.css({
    position: 'absolute',
    display: 'none',
    width: 300,
    height: 300,
    background: '#eee',
    border: '1px solid #d2d2d2',
    overflow: 'auto'
  });
  return $ele;
};

Department.prototype = {
  constructor: Department,
  init() {
    this.$tpl = Department.getTpl();
    this.setContainerPos();
    $('body')
      .append(this.$tpl);
    this.getData(this.options.url)
      .then($.proxy(this.setTree, this));
    this.bindEvent();
  },
  setContainerPos() {
    var $ele = this.options.$ele;
    var offset = $ele.offset();
    offset.top += $ele.outerHeight();
    this.$tpl.css(offset);
  },
  setTree(nodes) {
    var settings = {
      callback: {
        onClick: (_, _1, obj) => {
          if (!obj.children) {
            this.options.$ele.val(obj.name);
            this.options.$hidden.val(obj.id);
            this.$tpl.hide();
          }
        }
      }
    };
    var $ul = $(`<ul class="ztree" id="ztree${$.guid++}">`);
    this.$tpl.append($ul);
    $.fn.zTree.init($ul, settings, nodes);
  },
  getData(url) {
    return $.ajax({
      url
    }).then(res => {
      if (res.success) {
        return res.data;
      }
    });
  },
  bindEvent() {
    this.options.$ele
      .on('focus', () => {
        this.$tpl.show();
      })
      .on('click', () => false);
    this.$tpl.on('click', () => false);
    $(document).on('click', () => {
      this.$tpl.hide();
    });
  }
};

$.fn.department = function(_options) {
  return this.each((_, item) => {
    var $item = $(item);
    if ($item.data('_department')) {
      return;
    }
    let options = $.extend({
      $ele: $item
    }, _options);
    $item.data('_department', new Department(options));
  });
};

export default Department;