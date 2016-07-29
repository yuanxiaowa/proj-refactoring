import 'bootstrapTable';
import 'jqueryForm2json';
import echarts from 'echarts';

var chart = (ele => {
  var myChart = echarts.init(ele);
  myChart.setOption({
    title: {
      text: '材料价格指数',
      textAlign: 'center',
      left: '50%'
    },
    tooltip: {
      trigger: 'axis',
      formatter(param) {
        var arr = [];
        $.each(param, (_, item) => {
          if (item.value) {
            arr.push(item.seriesName + ': ' + item.value);
          }
        });
        return arr.join('<br>');
      }
    },
    xAxis: [{
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '管材',
      type: 'line'
    }, {
      name: '电线',
      type: 'line'
    }]
  });
  return {
    update(data) {
      var series = [{
        data: []
      }, {
        data: []
      }];
      $.each(data, (i, item) => {
        $.each(item, (k, v) => {
          if ('name1' === k) {
            return;
          }
          series[i].data.push(v);
        });
      });

      myChart.setOption({
        series
      });
    }
  };
})($('#echarts-1')[0]);

var table = (($table, chart) => {
  $table.bootstrapTable({
    url: 'data/items2',
    method: 'post',
    responseHandler(res) {
      chart.update(res.data);
      return res.data;
    },
    columns: [{
      field: 'name1',
      title: '材料类型'
    }, {
      field: 'name2',
      title: '1月平均价'
    }, {
      field: 'name3',
      title: '2月平均价'
    }, {
      field: 'name4',
      title: '3月平均价'
    }, {
      field: 'name5',
      title: '4月平均价'
    }, {
      field: 'name6',
      title: '5月平均价'
    }, {
      field: 'name7',
      title: '6月平均价'
    }, {
      field: 'name8',
      title: '7月平均价'
    }]
  });
  return {
    update(data) {
      $table.bootstrapTable('refresh');
    }
  };
})($('table'), chart);

$('form').submit(function() {
  table.update($(this).form2json());
  return false;
});