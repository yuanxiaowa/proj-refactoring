import 'bootstrapTable';
import 'jqueryForm2json';
import echarts from 'echarts';
import 'echarts.bmap';
import 'echarts.china';

var chart = (ele => {
  var myChart = echarts.init(ele);
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter(params) {
        if (!params.value) {
          return;
        }
        let data = params.data.data;
        let str = '';
        str += `${params.name}<br>`;
        str += `采购量: ${data.name2}<br>`;
        str += `平均价: ${data.name3}`;
        return str;
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
          show: true,
          color: '#f00'
        }
      }
    }]
  });
  return {
    update(data) {
      var series = [{
        data: []
      }];
      $.each(data, (_, item) => {
        series[0].data.push({
          name: item.name1,
          value: item.name2,
          selected: true,
          data: item
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
    url: 'data/items3',
    method: 'post',
    responseHandler(res) {
      chart.update(res.data);
      return res.data;
    },
    columns: [{
      field: 'name1',
      title: '省份'
    }, {
      field: 'name2',
      title: '采购量'
    }, {
      field: 'name3',
      title: '平均价'
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