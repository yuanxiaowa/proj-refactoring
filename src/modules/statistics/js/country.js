import 'bootstrapTable';
import 'jqueryForm2json';
import echarts from 'echarts';
import 'echarts.bmap';
import 'echarts.china';

var $form = $('form');

var charts = ((eles) => {
  var titles = ['全国各个省份产值统计', '中国行政区域及地理区域划分图'];
  var option = {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        if (!params.value) {
          return;
        }
        let data = params.data.data;
        return `${params.name}<br>项目个数: ${data.name3}个<br>合同产值: ${data.name4}万<br>冶金行业产值: ${data.name5}万<br>化工行业产值: ${data.name7}万<br>化工行业产值: ${data.name9}万`;
      }
    },
    series: [{
      type: 'map',
      mapType: 'china',
      roam: true,
      scaleLimit: {
        min: 1
      },
      showLegendSymbol: false,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      }
    }]
  };
  var arr = [];

  function init(i) {
    var chart = echarts.init(eles[i]);
    arr[i] = chart;
    chart.setOption($.extend({
      title: {
        text: titles[i],
        textAlign: 'center',
        left: '50%'
      }
    }, option));
  }

  function getR() {
    var d = 256 * Math.random() >> 0;
    return ('00' + d.toString(16)).substr(-2);
  }

  function getRandomColor() {
    return `#${getR()}${getR()}${getR()}`;
  }

  return {
    update(data, i) {
      if (!arr[i]) {
        init(i);
      }
      let series = [{
        data: []
      }];
      $.each(data, (_, item) => {
        series[0].data.push({
          name: item.name2,
          value: item.name3,
          selected: true,
          data: item,
          itemStyle: {
            normal: {
              color: getRandomColor()
            }
          }
        });
      });
      arr[i].setOption({
        series
      });
    }
  };
})($('#echarts-1,#echarts-2').get());

var tables = (($tables, charts) => {
  var arr = [];
  var query;
  var options = [
    [{
      field: 'name1',
      title: '编号'
    }, {
      field: 'name2',
      title: '省份'
    }, {
      field: 'name3',
      title: '项目个数'
    }, {
      field: 'name4',
      title: '合同产值',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name5',
      title: '冶金行业',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name6',
      title: '冶金行业占比',
      formatter(value) {
        return value + '%';
      }
    }, {
      field: 'name7',
      title: '化工行业',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name8',
      title: '化工行业占比',
      formatter(value) {
        return value + '%';
      }
    }, {
      field: 'name9',
      title: '化工行业',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name10',
      title: '化工行业占比',
      formatter(value) {
        return value + '%';
      }
    }],
    [{
      field: 'name1',
      title: '编号'
    }, {
      field: 'name2',
      title: '区域'
    }, {
      field: 'name3',
      title: '项目个数'
    }, {
      field: 'name4',
      title: '合同产值',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name5',
      title: '冶金行业',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name6',
      title: '冶金行业占比',
      formatter(value) {
        return value + '%';
      }
    }, {
      field: 'name7',
      title: '化工行业',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name8',
      title: '化工行业占比',
      formatter(value) {
        return value + '%';
      }
    }, {
      field: 'name9',
      title: '化工行业',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name10',
      title: '化工行业占比',
      formatter(value) {
        return value + '%';
      }
    }]
  ];

  function init($table, i) {
    $table.bootstrapTable({
      url: 'data/country-items',
      method: 'post',
      responseHandler(res) {
        charts.update(res.data.rows, i);
        return res.data;
      },
      sidePagination: 'server',
      queryParams(params) {
        return $.extend(params, query);
      },
      pagination: true,
      columns: options[i]
    });
  }

  return {
    update(i, _query) {
      query = _query;
      if (!arr[i]) {
        init($tables.eq(i), i);
        arr[i] = true;
      } else {
        $tables.eq(i).bootstrapTable('refresh');
      }
    }
  };
})($('table'), charts);

let cur = 0;

// 表单提交
$form.submit(function() {
  var query = $(this).form2json();
  tables.update(cur, query);
  return false;
}).submit();

$form
  .find(':radio')
  .each((_, item) => {
    $(item)
      .data('target', `#pane${_ + 1}`)
      .on('shown.bs.tab', () => {
        tables.update(_, $form.form2json());
      });
  })
  .on('change', function() {
    var $this = $(this);
    cur = $this.parent().index();
    $this.tab('show');
  });