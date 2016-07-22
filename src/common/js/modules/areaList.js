function AreaList(_option) {
  this.option = $.extend({
    onOk: $.noop,
    paramName: 'id',
    initData: []
  }, _option);
  this.results = [];
  this.init();
}

AreaList.num = 0;

AreaList.getTplTab = items => {
  var $tpl = $('<div class="nav nav-tabs">');
  $tpl.append($.map(items, (item, i) => {
    var $tpl = $('<li>', {
      'class': i ? '' : 'active'
    });
    $tpl.append(`<a href="#_areaList${AreaList.num++}">${item}</a>`);
    return $tpl;
  }));
  return $tpl;
};

AreaList.defaultPlaceholder = ['选择省', '选择市', '选择区'];

AreaList.getTplPane = () => {
  var items = Array(3);
  var $tpl = $('<div class="tab-content">');
  $tpl.append($.map(items, (item, i) => {
    return $('<div>', {
      id: '_areaList' + (AreaList.num + i - 3),
      'class': 'tab-pane ' + (i ? '' : 'active')
    });
  }));
  return $tpl;
};

AreaList.getTpl = items => {
  var $tpl = $('<div class="area-list">');
  var zIndex = 0;

  $('body').children().each((_, item) => {
    var _i = $(item).css('z-index');
    if (_i > zIndex) {
      zIndex = _i;
    }
  });

  $tpl.append('<div class="text-right"><i class="label label-default area-list-close">×</i></div>');
  $tpl.css({
    position: 'absolute',
    width: 300,
    border: '1px solid #d2d2d2',
    display: 'none',
    zIndex: zIndex
  });
  if (!items || !items.length) {
    items = AreaList.defaultPlaceholder;
  }
  $tpl.append(AreaList.getTplTab(items));
  $tpl.append(AreaList.getTplPane());
  return $tpl;
};

AreaList.getTplItem = item => {
  return `<a href="${item.id}">${item.text}</a>`;
};

AreaList.prototype = {
  constructor: AreaList,
  init() {
    this.$tpl = AreaList.getTpl();
    this.$tabs = this.$tpl.children().eq(1).find('a');
    this.$panes = this.$tpl.children().last().children();
    $('body').append(this.$tpl);
    // this.setContainerPos();
    this.bindEvent();
  },
  setContainerPos() {
    var $ele = this.option.$ele;
    var offset = $ele.offset();
    offset.top += $ele.outerHeight();
    this.$tpl.css(offset);
  },
  setContent(items, t) {
    if (!t) {
      t = 0;
    }
    let $container = this.$panes.eq(t);
    $container.append($.map(items, AreaList.getTplItem));
  },
  onResult() {
    this.option.$ele.val($.map(this.results, item => {
      return item.text;
    }).join('-'));
    this.option.onOk(this.results);
    this.hide();
  },
  hide() {
    this.$tpl.hide();
  },
  bindEvent() {
    var self = this;
    $('body').on('click', () => {
      self.hide();
    });
    this.option.$ele
      .on('click', e => {
        e.stopPropagation();
      })
      .on('focus', () => {
        this.setContainerPos();
        this.$tpl.show();
        if (!this.isLoad) {
          this.isLoad = true;
          this.load(this.option.id).then(items => {
            this.setContent(items);
            if (this.option.initData.length) {
              this.$panes.first().find(`a[href=${this.option.initData.shift()}]`).click();
            }
          });
        }
      });
    this.$tpl
      .on('click', e => {
        e.stopPropagation();
      })
      .on('click', '.nav a', function() {
        $(this).tab('show').parent().siblings().removeClass('active');
        return false;
      })
      .on('click', '.area-list-close', () => {
        this.hide();
        return false;
      })
      .on('click', '.tab-content a', function(e) {
        var $this = $(this);
        var $p = $this.parent();
        var index = $p.index();
        var v = $this.attr('href');
        var text = $this.text();
        $this.addClass('is-active').siblings().removeClass('is-active');
        self.results[index] = {
          id: v,
          text: text
        };
        self.$tabs.eq(index).text(text);
        for (let i = index + 1, len = self.$tabs.length; i < len; i++) {
          self.$tabs.eq(i).text(AreaList.defaultPlaceholder[i]);
        }
        if (2 === index) {
          if (!e.isTrigger) {
            self.onResult();
          }
          return false;
        }
        // 清空后续地区
        $p.nextAll().empty();
        self.$tabs.eq(index + 1).click();
        self.load(v).then(items => {
          self.setContent(items, index + 1);
          if (e.isTrigger) {
            let d = self.option.initData.shift();
            if (d) {
              self.$panes.eq(index + 1).find(`a[href=${d}]`).click();
            }
          }
        });
        return false;
      });
  },
  load(id) {
    return $.ajax({
      data: {
        [this.option.paramName]: id
      },
      url: this.option.url
    }).then(res => res.data);
  }
};

$.fn.areaList = function(_option) {
  return $(this).each(function() {
    var $this = $(this);
    var sym = `_areaList${$.expando}`;
    if (!$this.data(sym)) {
      let option = $.extend({
        $ele: $this
      }, _option);
      let al = new AreaList(option);
      $this.data(sym, al);
    }
    return $this;
  });
};

export default AreaList;