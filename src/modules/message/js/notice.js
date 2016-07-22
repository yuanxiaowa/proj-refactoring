/*
* @Author: huangzexia
* @Date:   2016-07-15 15:00:40
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-15 15:57:16
*/

import 'bootstrapTable';
$('table')
  .bootstrapTable({
    url: 'data/notice',
    sidePagination: 'server',
    search: true,
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      title: '序号',
      align: 'center',
      field: 'Num'
    }, {
      title: '标题',
      align: 'center',
      formatter:function(value,row,index){  
        var look = '<div class="new"><a href="detail.html">'+'【重要】扬建集团扬州星悦府项目紧急招标！大单来袭'+'</a><img src="image/new.png" class="tip-pic" /></div>';
        return look;  
      } 
    }, {
      title: '日期',
      align: 'center',
      field: 'date'
    }]
  });