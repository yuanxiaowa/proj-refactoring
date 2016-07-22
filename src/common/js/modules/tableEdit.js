function TableEdit(options) {
  this.options = $.extend({
    prefix: 'items'
  }, options);
  this.queue = [];
  this.init();
}

TableEdit.getEle = (item, prefix, index, value, row) => {
  let name, $ele, $eles,
    uneditable = false === item.editable;
  if (item.name) {
    name = `${prefix}[${index}].${item.name}`;
  }
  if (/number|string|boolean|undefined|null/.test($.type(value))) {
    value = {
      value
    };
  }
  if ('formatter' in item) {
    return item.formatter(item.name, index, value, row);
  } else if (!item.type) {
    return item.data;
  } else if ('genNum' === item.type) {
    return index;
  } else if ('delBtn' === item.type) {
    return `<a class="btn btn-danger j-item-del" href="">删除</a>`;
  }

  $eles = [];
  if (uneditable) {
    $ele = $('<span>');
    $eles.push($ele);
  } else {
    if ('input' === item.type) {
      $ele = $(`<input class="form-control">`);
      $ele.attr(item.attrs || {});
      $eles.push($ele);
    } else if ('select' === item.type) {
      $ele = $(`<select class="form-control">`);
      $ele.attr(item.attrs || {});
      $.each(item.data, (_, _item) => {
        var $opt = $('<option>');
        if ('string' === $.type(_item) || 'number' === $.type(_item)) {
          $opt.text(_item);
        } else {
          $opt.text(_item.text).val(_item.value);
        }
        $ele.append($opt);
      });
      $eles.push($ele);
    } else if ('addon' === item.type) {
      let $wrap = $('<div class="input-group">');
      $ele = $(`<input class="form-control">`);
      $wrap.append($ele, '<a href="" class="input-group-addon">+</a>');
      $eles.push($wrap);
    }
  }

  if (item.hasHidden) {
    $ele.val(value.text);
    $ele = $(`<input type="hidden">`);
    $eles.push($ele);
  } else if (uneditable) {
    $ele.text(value.value);
    $ele = $(`<input type="hidden">`);
    $eles.push($ele);
  }
  $ele.attr('name', name);
  $ele.val(value.value);
  return $eles;
};

TableEdit.getData = url => {
  return $.ajax({
    url: url
  }).then(res => {
    if (res.success) {
      return res.data;
    }
  });
};

TableEdit.prototype = {
  constructor: TableEdit,
  init() {
    this.$tbody = this.options.$table.find('tbody');
    this.index = this.$tbody.children().length + 1;
    if (this.options.url) {
      TableEdit.getData(this.options.url).then($.proxy(this.render, this));
    }
    this.bindEvent();
  },
  render(datas) {
    this.addTr(datas);
  },
  on(type, cb) {
    this.queue.push({
      type,
      cb
    });
  },
  trigger(type, data) {
    $.each(this.queue, (_, item) => {
      if (type === item.type) {
        item.cb(data);
      }
    });
  },
  addTr(rows) {
    if (!$.isArray(rows)) {
      rows = [rows];
    }
    let $eles = $.map(rows, item => {
      return this.getTr(item);
    });
    this.$tbody.append($eles);
    $.each($eles, (_, $tr) => {
      this.trigger('trAdded', $tr);
    });
  },
  bindEvent() {
    if (this.options.$btnAdd) {
      let eventAdd = () => {
        this.addTr();
        return false;
      };
      if ('string' === $.type(this.options.$btnAdd)) {
        this.options.$table.on('click', this.options.$btnAdd, eventAdd);
      } else {
        this.options.$btnAdd.on('click', eventAdd);
      }
    }
    this.options.$table
      .on('click', '.j-item-del', function() {
        $(this).closest('tr').remove();
        return false;
      })
      .on('click', '.j-item-edit', function() {
        return false;
      });
  },
  getTr(values) {
    var $tr = $('<tr>');
    var index = this.index++;
    values = values || {};
    $.each(this.options.columns, (_, item) => {
      var $td = $('<td>');
      var value = values[item.name];
      $td.append(TableEdit.getEle(item, this.options.prefix, index, value, values));
      $tr.append($td);
    });
    return $tr;
  }
};

export default TableEdit;