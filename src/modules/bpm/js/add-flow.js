/*
* @Author: huangzexia
* @Date:   2016-07-11 10:00:31
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-14 12:01:26
*/
import 'orgLeft';
import 'bootstrapTable';
import 'modalRemote';
import 'zTree';
import Dialog from 'dialog';

//----------------页面搜索--------------
let $addon = $('#addon');
let $itembox = $('.item-box');
let choseditemArrs = [];
$addon
  .on('loaded.modalremote', $modal => {

    $('.selectPage').bootstrapTable({
      url: 'data/add-flow',
      sidePagination: 'server',
      clickToSelect: true,
      pagination: true,
      search: true,
      ajaxOptions: {
        dataFilter(res) {
          return JSON.stringify($.parseJSON(res).data);
        }
      },
      columns: [{
        field: 'checked',
        checkbox: true
      }, {
        title: '序号',
        align: 'center',
        field: 'num',

      }, {
        title: '模块',
        align: 'center',
        field: 'module'
      }, {
        title: '页面',
        align: 'center',
        field: 'page'
      }],
    });

    $addon
      .on('ok.modalremote', () => {
        $addon.data('dialog').hide()
      });
    //选择确定选项
    $('.j-modal-ok').click(function() {
       let selections = $('.selectPage').bootstrapTable('getSelections');
       if(selections.length == 0)
       {
        $.alert('choose at least one coin!');
        return false;
       }
       for(let i = 0; i<selections.length ;i++)
       {
        //判断是否已经选择过该选项
        let appendHtml = '';
        if( $.inArray(selections[i].page, choseditemArrs)<0 )
        {
          choseditemArrs.push(selections[i].page);
          let showSelect = selections[i].module+"-"+selections[i].page+'<input type="hidden"  class="page-select-item" value="'+selections[i].page+'">';
          appendHtml = showitem(showSelect);
        }
        $('.page-list').append(appendHtml);
       }
    })
  });
//删除选中的页面
$('.page-list').on('click', '.del', function() {
    let removeVal = $(this).parent().find('input[class="page-select-item"]').val();
    choseditemArrs.splice($.inArray(removeVal,choseditemArrs),1);
    $(this).parent().remove();
})
//元素内容
function showitem( texts) {
   return '<div class="item"><span class="page-name">'+texts+'</span><a title="删除" href="javascript:;" class="del">-</a></div>';
}

let $materialtpl = $$include('/partials/_add-flow-search');
let dialog = new Dialog({
  title: '通知人选择',
  size: Dialog.SIZELG,
  content: $materialtpl,
  btnsTxt: {
    stxt: '确认选择'
  }
});
//------------------人员操作--------------------
let $_that;
$('.container-fluid').on('click','.notify-people-select',function(){
      dialog.show();
      $_that = $(this);
      $('.modal').on('click', '.j-modal-ok', function() { 
      let returnData = '';
      $('.chosedlist').children('li').each(function() {
          let chosedname = $(this).find('input[type="checkbox"]').attr('data-id');
          returnData += chosedname+',';
      })
      $_that.prev('.remebers').val(returnData);
      dialog.hide();
})
});

//左侧部门
    let setting = {
      view: {
        showIcon: showIconForTree
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };
    let zNodes = [{
        id: 1,
        pId: 0,
        name: "01人工",
        open: true
      }, {
        id: 11,
        pId: 1,
        name: "0101人工"
      }, {
        id: 111,
        pId: 11,
        name: "子节点111"
      }, {
        id: 112,
        pId: 11,
        name: "子节点112"
      }, {
        id: 22,
        pId: 2,
        name: "02黑色有色金属"
      }, {
        id: 221,
        pId: 22,
        name: "水泥221"
      }, {
        id: 222,
        pId: 22,
        name: "水泥222"
      }, {
        id: 23,
        pId: 2,
        name: "03建材"
      }, {
        id: 231,
        pId: 23,
        name: "建材231"
      }, {
        id: 232,
        pId: 23,
        name: "建材232"
      }, {
        id: 233,
        pId: 23,
        name: "建材233"
      }, {
        id: 234,
        pId: 23,
        name: "建材234"
      }
 ];
function showIconForTree(treeId, treeNode) {
  return !treeNode.isParent;
};
$(document).ready(function(){
  $.fn.zTree.init($('#treeDemo'), setting, zNodes);
});
//中间列表
$('#bm-table').bootstrapTable({
                url: 'data/notice-search.json',
                sidePagination: 'server',
                clickToSelect: true,
                ajaxOptions: {
                  dataFilter(res) {
                    return JSON.stringify($.parseJSON(res).data);
                  }
                },
                columns: [{
                  field: 'checked',
                  checkbox: true
                }, {
                  title: '姓名',
                  align: 'center',
                  field: 'name'
                }, {
                  title: '工号',
                  align: 'center',
                  field: 'num'
                }, {
                  title: '职位',
                  align: 'center',
                  field: 'indentity'
                }],
 });
//选中 移入操作
$('.j-role-a').on('click', ()=>{
      let selections = $('#bm-table').bootstrapTable('getSelections');
      let appendSelHtml = '';
      $.each(selections,function(n,value){
            appendSelHtml +=  getItem(value);
      });
      $('.chosedlist').append(appendSelHtml)
});
//选中 移出操作
$('.j-role-r').on('click', ()=>{
      $('.chosedlist').children('li').each(function() {
          if( $(this).find('input[type="checkbox"]').is(':checked') ){
            $(this).remove();
          }
      })
});
//----------------是否知会--------------
$itembox.on('click', '.isHasTeam', function() {
  let $notifys = $(this).parents('.approve-container').find('.notify-people');
  if( $(this).is(':checked') ) {
    $notifys.removeClass('hidden');
  }else {
    $notifys.addClass('hidden');
  }
})
//格式化内容
function getItem( objitem ) {
    let ischosed = 0;
    $('.chosedlist').children('li').each(function() {
      let chosedname = $(this).find('input[type="checkbox"]').attr('data-id');
      if( chosedname == objitem.name ) {
         ischosed++ ;
      }
     });
    if( ischosed>0 )
    {
       return  '';
    }else {
       return  '<li><label><input type="checkbox" data-id="'+objitem.name+'">'+objitem.name+'</label></li>';
    }  
}
//审批人 
let curapproverNum = 2; 
$itembox.on('blur' , '.approverSelect:last', function() {
    let approveVal = $(this).val().trim();

    if( approveVal.length >0 &&$(this).next()) {
        let approverhtml = reOncurapproverhtml(); 
        if(approverhtml){
          $itembox.find('.approve-container').last().after(approverhtml);
          curapproverNum ++;
         }
       }
    //删除一行
    $('.approve-container').on('click' , '.del', function() {
        $(this).parents('.approve-container').remove();
    });   
});
  
//新增联系人
let $add_parts = $$include('/partials/_add-flow-part');
function reOncurapproverhtml() {
  if( curapproverNum< 10){
      return $add_parts;
  }else{
      return '';
  }
}