import echarts from 'echarts';
import 'echarts.bmap';
import 'echarts.china';
import 'modalRemote';
import 'zTree';

//--------------------------添加快捷通道------------------//
var $addPipe = $('#add-pipe');
$addPipe.on('loaded.modalremote', $modal => {
/*树形菜单*/
var setting = {
      check: {
        enable: true,
        chkStyle:"checkbox"
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };
var zNodes =[
  { id:11, pId:1, name:"项目管理", urls:'http://127.0.0.1:8080/projectmanagement/projectdetail.html',ico:'aa.jpg',open:true},
  { id:111, pId:11, name:"项目立项信息",urls:'http://127.0.0.1:8080/projectmanagement/add-pact.html',ico:'cbb.jpg' },
  { id:112, pId:11, name:"补充合同",urls:'http://127.0.0.1:8080/projectmanagement/add-pact.html',ico:'cbb1.jpg' },
  { id:12, pId:1, name:"采购管理", open:true},
  { id:121, pId:12, name:"采购单" ,urls:'http://127.0.0.1:8080/purchasemanagement/add-purchase.html',ico:'abb2.jpg' },
  { id:122, pId:12, name:"采购计划",urls:'http://127.0.0.1:8080/projectmanagement/add-pact.html',ico:'cbb3.jpg' },
  { id:13, pId:1, name:"仓储管理", open:true},
  { id:131, pId:13, name:"代收货",urls:'http://127.0.0.1:8080/projectmanagement/add-pact.html',ico:'cbb4.jpg' },
  { id:132, pId:13, name:"退货单",urls:'http://127.0.0.1:8080/projectmanagement/add-pact.html',ico:'cbb5.jpg' },
  { id:14, pId:1, name:"付款管理", open:true},
  { id:141, pId:14, name:"付款申请",urls:'http://127.0.0.1:8080/projectmanagement/add-pact.html',ico:'cbb6.jpg' },
  { id:142, pId:14, name:"待支付",urls:'http://127.0.0.1:8080/projectmanagement/add-pact.html',ico:'cbb7.jpg' }
];

var code;
function setCheck() {
  var zTree = $.fn.zTree.getZTreeObj("treeDemo"),

  py = $("#py").attr("checked")? "p":"",
  sy = $("#sy").attr("checked")? "s":"",
  pn = $("#pn").attr("checked")? "p":"",
  sn = $("#sn").attr("checked")? "s":"",
  type = { "Y":py + sy, "N":pn + sn};
  zTree.setting.check.chkboxType = type;
  showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
}
function showCode(str) {
  if (!code) code = $("#code");
  code.empty();
  code.append("<li>"+str+"</li>");
}

$(document).ready(function(){
  $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});

//选择过的菜单
function choosedNenu() {
  var selectedMenuarr = [];
  $('.pipe-list').find('a').each(function() {
      selectedMenuarr.push( parseInt($(this).attr('data-id')));
  })
  return selectedMenuarr;
}

$addPipe
      .on('ok.modalremote', () => {
        var selectedMenuarr = choosedNenu();
        var selectedNum = selectedMenuarr.length;
        if( selectedNum >4 ) {
            $.alert('Only less than 5 menus!');
            $addPipe.data('dialog').hide();
            return;
        }
        //待选择菜单数量
        var readyselectNum = 0;
        // 点击确定，获取选择数据
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getCheckedNodes();
        if( nodes.length > 0 ) {
          //获取当前选择菜单数量
          $.each( nodes,function(tr_i, tr_item ){
            var findNum = $.inArray(tr_item.id,selectedMenuarr) ;
            var maxSelectedNum = selectedNum + readyselectNum; //计算操作的菜单总和
            if( (tr_item.pId != null )&&( findNum ==-1 ) && (maxSelectedNum<5)) {
              readyselectNum++;
              var Ahtml = '<a class="btn btn-default nav_url" data-id="'+tr_item.id+'" data-content="'+tr_item.name+'"  href="javascript:;"  data-item="'+tr_item.urls+'"><span>'+tr_item.name+'</span><span class="J-closed close">×</span></a>';
              $('.pipe-list').append(Ahtml);
            }
          })
        }
        $addPipe.data('dialog').hide();
      });
});
//删除选中菜单
$('.pipe-list').on('click', '.J-closed', function() {
    $(this).parent('a').remove();
});
$('.pipe-list').on('click', '.nav_url', function() {
    var urls = $(this).attr('data-item');
    var urlname = $(this).attr('data-content');
    parent.openLink(urls,urlname);
});
//--------------------------全国产值地图------------------//
var myChart1 = echarts.init($('#echarts-1')[0]);
var myChart2 = echarts.init($('#echarts-2')[0]);
var option1 = {
    tooltip : {
        trigger: 'item'
    },
    dataRange: {
        min: 0,
        max: 100000,
        x: '50px',
        y: '50px',
        text:['万元',''],           // 文本，默认为数值文本
        calculable : true
    },
    toolbox: {
        show: true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    roamController: {
        show: true,
        x: 'right',
        mapTypeControl: {
            'china': true
        }
    },
    series : [
        {
            name: '项目产值',
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value:6000},
                {name: '天津',value:6000},
                {name: '上海',value:60000},
                {name: '重庆',value:6000},
                {name: '河北',value:6000},
                {name: '河南',value:6000},
                {name: '云南',value:6000},
                {name: '辽宁',value:6000},
                {name: '黑龙江',value: 1500},
                {name: '湖南',value: 8000},
                {name: '安徽',value: 80000},
                {name: '山东',value: 8000},
                {name: '新疆',value: 8000},
                {name: '江苏',value: 8000},
                {name: '浙江',value: 8000},
                {name: '江西',value: 8000},
                {name: '湖北',value: 8000},
                {name: '广西',value: 8000},
                {name: '甘肃',value: 8000},
                {name: '山西',value: 8000},
                {name: '内蒙古',value: 1500},
                {name: '陕西',value: 10000},
                {name: '吉林',value: 10000},
                {name: '福建',value: 10000},
                {name: '贵州',value: 10000},
                {name: '广东',value: 10000},
                {name: '青海',value: 100000},
                {name: '西藏',value: 10000},
                {name: '四川',value: 10000},
                {name: '宁夏',value: 10000},
                {name: '海南',value: 10000},
                {name: '台湾',value: 10000},
                {name: '香港',value: 10000},
                {name: '澳门',value: 10000}
            ]
        }
    ]
};
                    
var option2 = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
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
    min: 1,
    max: 12,
    interval: 1
  }],
  yAxis: [{
    type: 'value',
    min: 0,
    max: 1000,
    interval: 100
  }],
  series: [{
    name: '采购额',
    type: 'line',
    data: getArr()
  }]
};
myChart1.setOption(option1);
myChart2.setOption(option2);

function getArr() {
  /*eslint yoda:0*/
  var arr = [];
  var i = 0;
  for (; i < 15; i++) {
    arr.push([i * 1, (Math.random() * 100)]);
  }
  return arr;
}
























// var myChart1 = echarts.init($('#echarts-1')[0]);

// var myChart3 = echarts.init($('#echarts-3')[0]);

// var myChart5 = echarts.init($('#echarts-5')[0]);

// /*eslint no-magic-numbers:0*/


// var option2 = {
//   tooltip: {
//     trigger: 'item',
//     formatter: '{b}'
//   },
//   series: [{
//     name: '中国',
//     type: 'map',
//     mapType: 'china',
//     selectedMode: 'multiple',
//     label: {
//       emphasis: {
//         show: true
//       }
//     }
//   }]
// };

// var option3 = {
//   tooltip: {
//     trigger: 'item',
//     formatter: '{a} <br/>{b} : {c} ({d}%)'
//   },
//   legend: {
//     bottom: 'bottom',
//     data: ['上涨', '下跌', '持平']
//   },
//   series: [{
//     type: 'pie',
//     data: [
//       { value: 335, name: '上涨' },
//       { value: 310, name: '下跌' },
//       { value: 135, name: '持平' }
//     ]
//   }]
// };

// var option4 = {
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: { // 坐标轴指示器，坐标轴触发有效
//       type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//     }
//   },
//   legend: {
//     data: ['苏州', '上海']
//   },
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   xAxis: [{
//     type: 'category',
//     data: ['木板', '焦炭', '水泥', '铁矿石', '钢材']
//   }],
//   yAxis: [{
//     type: 'value'
//   }],
//   series: [{
//     name: '直接访问',
//     type: 'bar',
//     data: [320, 332, 301, 334, 390]
//   }, {
//     name: '邮件营销',
//     type: 'bar',
//     stack: '广告',
//     data: [120, 132, 101, 134, 90]
//   }]
// };


// var option5 = {

//   tooltip: {
//     trigger: 'item',
//     formatter: '{a} <br/>{b} : {c} ({d}%)'
//   },

//   visualMap: {
//     show: false,
//     min: 80,
//     max: 600,
//     inRange: {
//       colorLightness: [0, 1]
//     }
//   },
//   legend: {
//     bottom: 'bottom',
//     data: ['钢材', '水泥', '铁矿石', '焦炭']
//   },
//   series: [{
//     name: '访问来源',
//     type: 'pie',
//     radius: '55%',
//     center: ['50%', '50%'],
//     data: [
//       { value: 335, name: '钢材' },
//       { value: 310, name: '水泥' },
//       { value: 274, name: '铁矿石' },
//       { value: 235, name: '焦炭' }
//     ].sort(function(a, b) {
//       return a.value - b.value;
//     }),
//     roseType: 'angle',
//     label: {
//       normal: {
//         textStyle: {
//           color: 'rgba(255, 255, 255, 0.3)'
//         }
//       }
//     },
//     labelLine: {
//       normal: {
//         lineStyle: {
//           color: 'rgba(255, 255, 255, 0.3)'
//         },
//         smooth: 0.2,
//         length: 10,
//         length2: 20
//       }
//     },
//     itemStyle: {
//       normal: {
//         shadowBlur: 200,
//         shadowColor: 'rgba(0, 0, 0, 0.5)'
//       }
//     }
//   }]
// };

// myChart1.setOption(option1);
// myChart2.setOption(option2);
// myChart3.setOption(option3);
// myChart4.setOption(option4);
// myChart5.setOption(option5);


