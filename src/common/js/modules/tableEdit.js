function TableEdit(options) {
  this.options = options;
  this.queue = [];
  this.init();
}

TableEdit.getEle = item => {
  if (!item.type) {
    return item.data;
  } else if ('genNum' === item.type) {
    return ++item.data;
  } else if ('input' === item.type) {
    let $ele = $(`<input class="form-control" name="${item.name}">`);
    $ele.attr(item.attrs || {});
    return $ele;
  } else if ('select' === item.type) {
    let $ele = $(`<select class="form-control" name="${item.name}">`);
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
    return $ele;
  } else if ('addon' === item.type) {
    return `<div class="input-group"><input class="form-control" name="${item.name}"><a href="" class="input-group-addon">+</a></div>`;
  } else if ('delBtn' === item.type) {
    return `<a class="btn btn-danger j-item-del" href="">删除</a>`;
  } else if ('diy' === item.type) {
    return item.tpl;
  }
};

TableEdit.getTr = cols => {
  var $tr = $('<tr>');
  $.each(cols, (_, item) => {
    var $td = $('<td>');
    $td.append(TableEdit.getEle(item));
    $tr.append($td);
  });
  return $tr;
};

TableEdit.prototype = {
  constructor: TableEdit,
  init() {
    this.bindEvent();
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
  addTr() {
    var $tr = TableEdit.getTr(this.options.columns);
    this.options.$table.find('tbody').append($tr);
    this.trigger('trAdded', $tr);
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
  }
};

export default TableEdit;