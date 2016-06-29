import 'dialog';
/**
 * 省市联动
 */

function Linkage(options) {
  this.options = $.extend({
    initData: []
  }, options);
  this.init();
}

Linkage.getTemplate = (value, text) => {
  return `<option value="${value}">${text}</option>`;
};

Linkage.prototype = {
  constructor: Linkage,
  init() {
    if (this.options.id) {
      this.getData('boolean' === typeof this.options.id ? undefined : this.options.id)
        .then(data => {
          this.setElementData(this.options.$eles.first(), data);
        });
    }
    this.bindEvents();
  },
  bindEvents() {
    var self = this;
    var $eles = this.options.$eles;
    $eles.on('change', function() {
      var index = $eles.index(this);
      var id = this.value;
      var isLast = $eles.last().is(this);
      $eles.filter(`:gt(${index})`)
        .each(function() {
          $(this).children(':not(:first)').remove();
        });
      if (id && !isLast) {
        let $next = $eles.eq(index + 1);
        self.getData(id)
          .then(data => {
            self.setElementData($next, data);
          });
      }
    });
  },
  getData(id) {
    return $.ajax({
        url: this.options.url,
        data: {
          id
        },
        dataType: 'json'
      })
      .then(result => {
        if (result.success) {
          return result.data;
        } else {
          $.alert(result.msg);
        }
      });
  },
  setElementData($ele, datas) {
    datas.unshift({
      id: '',
      text: '请选择'
    });
    let tps = $.map(datas, item => {
      return Linkage.getTemplate(item.id, item.text);
    });
    $ele.html(tps.join(''));
    if (this.options.initData.length) {
      $ele.val(this.options.initData.shift());
      $ele.trigger('change');
    }
  }
};

export default Linkage;