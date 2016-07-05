import 'bootstrapDatetimepicker';
import 'bootstrapTable';
import 'zTree';
import Dialog from 'dialog';
import 'trfileUpload';

//材料清单
var $tabs1 = $('#tab1');
var $addTrs1 = $tabs1.find('.add-cos');
var ProcessNum1 = $addTrs1.parents('.table-responsive').find('table tbody').children().length;
//---------------------- 材料搜索---------------
var $materialtpl = $$include('/partials/add-material');
var dialog =new Dialog({
    title:"选择材料",
    size:Dialog.SIZELG,
    content:$materialtpl,
    btnsTxt:{
      stxt:"确认选择"
    }
  });
//tab1 新增表格
$tabs1.on('click', '.add-cos' , function () {
   var $tbody = $(this).parents('.table-responsive').find('table tbody');
   var $tmp = $(getTemp(ProcessNum1,1));
   $tbody.append($tmp);
   $tmp.find('input[date]').datetimepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
   });
   ProcessNum1++;
   $tmp.on('click', '.input-group-addon' , function() {
       dialog.show();
  });
//删除一行
}).on('click', '.J-del-item', function () {
    $(this).closest('tr').remove();
});
//tab2 新增表格
var $tabs2 = $('#tab2');
var $addTrs2 = $tabs2.find('.add-cos');
var ProcessNum2 =  $addTrs2.parents('.table-responsive').find('table tbody').children().length;
$tabs2.on('click', '.add-cos' , function () {
   var $tbody = $(this).parents('.fqtable').find('table tbody');
   var $tmp2 = $(getTemp(ProcessNum2,2));
   $tbody.append($tmp2);
   $tabs2.find('input[date]').datetimepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
   });
   ProcessNum2++;

//删除一行
}).on('click', '.J-del-item', function () {
    $(this).closest('tr').remove();
});
//树形菜单
var setting = {
  view: {
    showIcon: showIconForTree
  },
  data: {
    simpleData: {
      enable: true
    }
  }
};
var zNodes =[
  { id:1, pId:0, name:"01人工", open:true},
  { id:11, pId:1, name:"0101人工"},
  { id:111, pId:11, name:"子节点111"},
  { id:112, pId:11, name:"子节点112"},
  { id:113, pId:11, name:"子节点113"},
  { id:114, pId:11, name:"子节点114"},
  { id:22, pId:2, name:"02黑色有色金属"},
  { id:221, pId:22, name:"水泥221"},
  { id:222, pId:22, name:"水泥222"},
  { id:223, pId:22, name:"水泥223"},
  { id:224, pId:22, name:"水泥224"},
  { id:23, pId:2, name:"03建材"},
  { id:231, pId:23, name:"建材231"},
  { id:232, pId:23, name:"建材232"},
  { id:233, pId:23, name:"建材233"},
  { id:234, pId:23, name:"建材234"}
];
function showIconForTree(treeId, treeNode) {
  return !treeNode.isParent;
};
$(document).ready(function(){
  $.fn.zTree.init($('#treeDemo'), setting, zNodes);
});
//------------------------弹框搜索----------------
$('#material')
  .bootstrapTable({
    url: '',
    sidePagination: 'server',
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      field: 'checked',
      checkbox: true
    }, {
      title: '分类',
      field: ''
    }, {
      title: '材料编码',
      field: ''
    }, {
      title: '材料名称',
      field: ''
    }, {
      title: '相似名称',
      field: ''
    }, {
      title: '规格型号',
      field: ''
    }, {
      title: '单位',
      field: ''
    }],
    clickToSelect: true,
    pagination: true,
    search:true
  });

//新增一行dom | 材料清单
  var marTrInputName = ['no1' ,'no2' ,'no3' ,'no4' ,'no5' ,'no6' ,'no7' ,'no8' ,'no9' ,'no10' ];//临时名称,使用前请更换
  var fqTrInputName = ['fno1' ,'fno2' ,'fno3' ];//临时名称,使用前请更换
  function getTemp(inums,types) {
    var inu =0;
    var trStr = '<tr><td>'+inums+'</td>'; 
    var trInputName = [];
    var trType = types;
    if(trType ==1 ) {
      trInputName = marTrInputName;
      for( inu=0; inu<trInputName.length; inu++ )
      {
        var inpname = 'name=material['+inums+'].'+trInputName[inu]
          switch(inu)
          {
            case 1:
                  trStr += '<td><div class="input-group"><input type="text" class="form-control" '+inpname+'><a data-target="#modal-purchase" data-toggle="modal" class="input-group-addon">+</a></div></td>';
                  break;
            case 4:
                  trStr += '<td><div class="input-group"><input type="text" class="form-control" date="true" '+inpname+'></div></td>';
                  break;
            default:
                trStr += '<td><div class="input-group"><input type="text" class="form-control" '+inpname+'></div></td>';
                break;
          }
     }
    }else {
      trInputName = fqTrInputName;
      for( inu=0; inu<trInputName.length; inu++ )
      {
          var inpname = 'name="yourname['+inums+'].'+trInputName[inu]+'"';
          switch(inu)
          {
            case 0:
                  trStr += '<td><div class="input-group"><input type="text" class="form-control" '+inpname+'><a class="input-group-addon">%</a></div></td>';
                  break;
            case 1:
                  trStr += '<td><input class="form-control" type="text"  date="true"  '+inpname+'></td>';
                  break;
            case 2:
                  trStr += '<td><textarea class="form-control" '+inpname+'></textarea></td>';
                  break;
          }
     }
    }
   trStr += '<td><a href="javascript:;" class="btn btn-default J-del-item">删除</a></td></tr>';
   return trStr;
  }


//------------------------时间引入----------------
$('input[date]').datetimepicker(
  {
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
  }
  );
//------------------------付款条款----------------
var $payCheck =$(".pay-style-check input");
var $payTab = $(".pay-style-tab");
$.each($payCheck,function(index,ele){
  $(ele).on('click',function(){
    switch (index) {
      case 0:
        $payTab.eq(0).hide();
        $payTab.eq(1).hide();
        break;
      case 1:
        $payTab.eq(0).show();
        $payTab.eq(1).hide();
        break;
      case 2:
        $payTab.eq(0).hide();
        $payTab.eq(1).show();
        break;
    }
  })
})


