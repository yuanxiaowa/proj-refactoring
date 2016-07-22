import 'bootstrapTable';
import echarts from 'echarts';

var $selects = $('select');

// 图表
var chart = ((ele, $selects) => {
  var myChart = echarts.init(ele);
  var option = {
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        var a1 = params[0];
        var a2 = params[1];
        return `${a1.name}: ${((a2.value - a1.value) / a1.value * 100).toFixed(2)}%`;
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: true,
      selectedMode: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['房屋建筑', '化工石油', '矿山工程', '矿山工程']
    }],
    yAxis: [{
      type: 'value',
      name: '产值(万元)'
    }],
    textStyle: {
      color: '#000'
    },
    series: [{
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      }
    }, {
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      }
    }]
  };

  function reconstructor() {
    myChart.dispose();
    myChart = echarts.init(ele);
  }

  return {
    update(data) {
      var v1 = $selects.eq(0).val();
      var v2 = $selects.eq(1).val();
      reconstructor();
      $.each(option.series, (_, item) => {
        item.data = [];
      });
      option.series[0].name = v1;
      option.series[1].name = v2;
      option.legend.data = [v1, v2];
      $.each(data, (_, item) => {
        option.series[0].data.push(item.name3);
        option.series[1].data.push(item.name4);
      });
      myChart.setOption(option);
    },
    showLoading() {
      myChart.showLoading();
    }
  };
})($('#echarts-1')[0], $selects);

// 表格
var table = (($table, chart) => {
  var option = {
    url: 'data/items1',
    method: 'post',
    responseHandler(res) {
      chart.update(res.data);
      return res.data;
    },
    showFooter: true,
    columns: [{
      field: 'name1',
      title: '编号'
    }, {
      field: 'name2',
      title: '行业类别'
    }, {
      field: 'name3',
      title: '2015年产值',
      formatter(value) {
        return value + '万';
      }
    }, {
      field: 'name4',
      title: '2016年产值',
      formatter(value) {
        return value + '万';
      }
    }, {
      title: '同比增长',
      formatter(value, row) {
        return ((row.name4 - row.name3) / row.name3 * 100).toFixed(2) + '%';
      }
    }]
  };
  $table.bootstrapTable(option);

  return {
    update(v1, v2) {
      option.columns[2].title = v1 + '年产值';
      option.columns[3].title = v2 + '年产值';
      $table.bootstrapTable('refreshOptions', option);
      chart.showLoading();
    }
  };
})($('table'), chart);

// 更新数据
$selects.on('change', () => {
  var v1 = $selects.eq(0).val();
  var v2 = $selects.eq(1).val();
  if (v1 && v2 && v1 !== v2) {
    table.update(v1, v2);
  }
});