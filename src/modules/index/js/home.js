/* global echarts:true */

// require(echarts)
// require(echarts.bmap)
// require(echarts.china)

var myChart1 = echarts.init($('#echarts-1')[0]);
var myChart2 = echarts.init($('#echarts-2')[0]);
var myChart3 = echarts.init($('#echarts-3')[0]);
var myChart4 = echarts.init($('#echarts-4')[0]);
var myChart5 = echarts.init($('#echarts-5')[0]);

/*eslint no-magic-numbers:0*/
var option1 = {
  title: {
    text: '钢材指数'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['天津', '苏州', '上海']
  },
  toolbox: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'value',
    min: 0,
    max: 30,
    interval: 2
  }],
  yAxis: [{
    type: 'value',
    min: 0,
    max: 130,
    interval: 10
  }],
  series: [{
    name: '天津',
    type: 'line',
    data: getArr()
  }, {
    name: '苏州',
    type: 'line',
    data: getArr()
  }, {
    name: '上海',
    type: 'line',
    data: getArr()
  }]
};

var option2 = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  series: [{
    name: '中国',
    type: 'map',
    mapType: 'china',
    selectedMode: 'multiple',
    label: {
      emphasis: {
        show: true
      }
    }
  }]
};

var option3 = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 'bottom',
    data: ['上涨', '下跌', '持平']
  },
  series: [{
    type: 'pie',
    data: [
      { value: 335, name: '上涨' },
      { value: 310, name: '下跌' },
      { value: 135, name: '持平' }
    ]
  }]
};

var option4 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['苏州', '上海']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['木板', '焦炭', '水泥', '铁矿石', '钢材']
  }],
  yAxis: [{
    type: 'value'
  }],
  series: [{
    name: '直接访问',
    type: 'bar',
    data: [320, 332, 301, 334, 390]
  }, {
    name: '邮件营销',
    type: 'bar',
    stack: '广告',
    data: [120, 132, 101, 134, 90]
  }]
};


var option5 = {

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  legend: {
    bottom: 'bottom',
    data: ['钢材', '水泥', '铁矿石', '焦炭']
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [
      { value: 335, name: '钢材' },
      { value: 310, name: '水泥' },
      { value: 274, name: '铁矿石' },
      { value: 235, name: '焦炭' }
    ].sort(function(a, b) {
      return a.value - b.value;
    }),
    roseType: 'angle',
    label: {
      normal: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    labelLine: {
      normal: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      }
    },
    itemStyle: {
      normal: {
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};

myChart1.setOption(option1);
myChart2.setOption(option2);
myChart3.setOption(option3);
myChart4.setOption(option4);
myChart5.setOption(option5);


function getArr() {
  /*eslint yoda:0*/
  var arr = [];
  var i = 0;
  for (; i < 15; i++) {
    arr.push([i * 2, (Math.random() * 100).toFixed(2)]);
  }
  return arr;
}
