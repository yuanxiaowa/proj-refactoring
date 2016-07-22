import 'bootstrapTable';
import 'jqueryForm2json';

var $table = $('table');

$table.bootstrapTable({
  url: 'data/items',
  method: 'post',
  sidePagination: 'server',
  pagination: true,
  detailView: true,
  detailFormatter(index, row, $detail) {
    var $subtable = $('<table>');
    $detail.append($subtable);
    $subtable.bootstrapTable({
      url: 'data/items?nopager=true',
      method: 'post',
      responseHandler(res) {
        return res.data;
      },
      columns: [{
        field: 'name1',
        title: '材料类型'
      }, {
        field: 'name2',
        title: '计划量'
      }, {
        field: 'name3',
        title: '采购量'
      }, {
        field: 'name4',
        title: '采购比例'
      }, {
        field: 'name5',
        title: '采购单价'
      }, {
        field: 'name6',
        title: '占材料成本比例'
      }]
    });
  },
  responseHandler(res) {
    return res.data;
  },
  columns: [{
    field: 'name1',
    title: '所属部门'
  }, {
    field: 'name2',
    title: '项目名称'
  }, {
    field: 'name3',
    title: '合同总额',
    formatter(value) {
      return value + '万';
    }
  }, {
    field: 'name4',
    title: '材料采购总额',
    formatter(value) {
      return value + '元';
    }
  }, {
    field: 'name5',
    title: '材料成本占比',
    formatter(value) {
      return value + '%';
    }
  }]
});

$('form').submit(function() {
  $table.bootstrapTable('refresh', {
    query: JSON.stringify($(this).form2json())
  });
  return false;
});