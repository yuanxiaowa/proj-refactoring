import 'bootstrapTable';
import 'jqueryForm2json';
import echarts from 'echarts';

var $table = $('table');
var $form = $('form');


// 基本配置
var option = {
  base: {
    echarts: {
      title: {
        text: '采购支出汇总',
        textAlign: 'center',
        left: '50%'
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          return params[0].value;
        }
      },
      xAxis: [{
        type: 'category'
      }],
      yAxis: [{
        type: 'value'
      }, {
        type: 'value'
      }],
      series: [{
        type: 'bar',
        itemStyle: {
          normal: {
            color: 'pink'
          }
        }
      }, {
        type: 'line',
        yAxisIndex: 1,
        lineStyle: {
          normal: {
            color: 'orange'
          }
        }
      }]
    },
    table: {}
  },
  columns: [
    ['月份', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ['部门', '一公司', '二公司', '三公司', '四公司', '五公司', '六公司'],
    ['区域', '华北', '华东', '西北', '华北', '华东']
  ]
};

// 当前类别
var cur = 0;

// 初始化表格以及图表
var init = (() => {
  var cacheInited = {};
  return i => {
    if (cacheInited[i]) {
      return;
    }
    let charts = echarts.init($(`#echarts-${i + 1}`)[0]);

    // 配置表格列
    let columns = option.columns[i].map((title, _i) => {
      var column = {
        title
      };
      if (_i) {
        column.field = `name${_i + 1}`;
      } else {
        column.formatter = () => '支出';
      }
      return column;
    });
    cacheInited[i] = true;

    // 配置图表
    charts.setOption(
      $.extend(
        true, {
          xAxis: [{
            data: option.columns[i]
          }]
        },
        option.base.echarts
      )
    );

    // 配置表格
    $table.eq(i).bootstrapTable({
      method: 'post',
      // 响应处理
      // 更新图表
      responseHandler(res) {
        var series = [{
          data: []
        }, {
          data: []
        }];
        $.each(res.data[0], (k, v) => {
          series[0].data.push(v);
          series[1].data.push(v);
        });
        charts.setOption({
          series
        });
        return res.data;
      },
      columns
    });
  };
})();

// 表单提交
$form.submit(function() {
  $table.eq(cur).bootstrapTable('refresh', {
    query: $(this).form2json(),
    url: `data/items?nopager=true&len=1&fl=${option.columns[cur].length}`
  });
  return false;
});

$form.find(':radio')
  // 更改类别
  .on('change', function() {
    var $this = $(this);
    cur = $this.parent().index();
    $this.tab('show');
  })
  .each((i, item) => {
    $(item)
      .data('target', '#pane' + (i + 1))
      .on('shown.bs.tab', () => {
        init(i);
        $form.submit();
      });
  });

init(0);
$form.submit();