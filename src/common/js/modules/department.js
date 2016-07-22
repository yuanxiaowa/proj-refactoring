import 'zTree';

function Department(options) {
  this.options = options;
  this.init();
}

Department.getTpl = () => {
  var $ele = $('<div>');
  var zIndex = 0;

  $('body').children().each((_, item) => {
    var _i = $(item).css('z-index');
    if (_i > zIndex) {
      zIndex = _i;
    }
  });
  $ele.css({
    position: 'absolute',
    display: 'none',
    width: 300,
    height: 300,
    background: '#eee',
    border: '1px solid #d2d2d2',
    overflow: 'auto',
    zIndex
  });
  return $ele;
};

Department.getTplLoading = () => {
  return $('<i class="icon-spinner icon-spin">');
};

Department.prototype = {
  constructor: Department,
  init() {
    this.$tpl = Department.getTpl();
    this.$tpl.append(Department.getTplLoading());
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
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onClick: (_, _1, obj) => {
          if (!obj.children.length || this.options.canSelectDir) {
            this.options.$ele.val(obj.name);
            this.options.$hidden.val(obj.id);
            this.$tpl.hide();
          }
        }
      }
    };
    var $ul = $(`<ul class="ztree" id="ztree${$.guid++}">`);
    this.$tpl.html($ul);
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
        this.setContainerPos();
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