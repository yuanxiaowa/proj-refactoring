import 'bootstrapDatetimepicker';
import 'bootstrapTable';
import 'zTree';
import Dialog from 'dialog';
import webUploader from 'webUploader';
import'toggle';

//---------------------- 材料搜索---------------
var $materialtpl = $$include('/partials/add-material');
var $choiceBtn = $(".input-group-addon");
var dialog =new Dialog({
    title:"选择材料",
    size:Dialog.SIZELG,
    content:$materialtpl,
    btnsTxt:{
      stxt:"确认选择"
    }
  });
$choiceBtn.on("click",function(){
  dialog.show()
})
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
//---------------------- 引入采购计划---------------
var $addPlan = $(".add-plan");
var $addPurchasePlantpl = $$include('/partials/purchase-plan');
var $addPurchasePlanDialog =new Dialog({
    title:"引入采购计划",
    size:Dialog.SIZELG,
    content:$addPurchasePlantpl,
    btnsTxt:{
      stxt:"添加"
    }
  });
$addPlan.on("click",function(){
  $addPurchasePlanDialog.show();
})
$('#addPlan')
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
      title: '编号',
      field: ''
    }, {
      title: '采购部门',
      field: ''
    }, {
      title: '采购项目',
      field: ''
    }, {
      title: '计划编号',
      field: ''
    }, {
      title: '材料类型',
      field: ''
    }, {
      title: '计划总额',
      field: ''
    }
    , {
      title: '计划年月',
      field: ''
    }
    , {
      title: '项目地区',
      field: ''
    }, {
      title: '备注',
      field: ''
    }],
    clickToSelect: true,
    pagination: true
  });
//------------------------推荐供应商----------------
$('#recommend-supplier')
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
      title: '编号',
      field: ''
    }, {
      title: '采购项目',
      field: ''
    }, {
      title: '推荐供应商',
      field: ''
    }, {
      title: '所在地区',
      field: ''
    }, {
      title: '开票类型',
      field: ''
    }
    , {
      title: '税率',
      field: ''
    }
    , {
      title: '评价等级',
      field: ''
    }, {
      title: '供应类型',
      field: ''
    }],
    clickToSelect: true
  });

//------------------------时间引入----------------
$('input[date]').datetimepicker();
//------------------------文件上传----------------
//上传图片
var uploader = webUploader.create({
    auto: true,
    swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
    pick: '.upFile-btn',
    server: 'url',
    accept: {
    extensions: 'gif,jpg,jpeg,bmp,png',
    mimeTypes: 'image/*'
    }
   });
//------------------------是否需要发布采购单+是否选择分期----------------
var $issueCheck = $('#issue-check');
var $payTimes = $('#pay-times');
var $payDate = $('.pay-date');
var $listWrap = $('.table-list-wrap');
isChecked($issueCheck,$listWrap);
isChecked($payTimes,$payDate);
/**
 * [isChecked description] 是否被选中
 * @param  {[type]}  btn [description]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
function isChecked(btn,obj){
  btn.on('click',function(){
    if($(this).is(':checked')){
      obj.show();
    }else{
      obj.hide();
    }
  })
}
//------------------------根据付款方式显示是否分期和定金比例----------------
var $payStyle = $('#payStyle');
var $payRelated = $('.pay-style-related');
$payStyle.change(function(){
  var styleVal = $(this).val();
  if(styleVal==0){
    $payRelated.show();
  }else if(styleVal==1){
    $payRelated.eq(1).show();
    $payRelated.eq(0).hide();
  }else if(styleVal==2){
    $payRelated.hide();
  }else if(styleVal==3){
    $payRelated.eq(1).show();
    $payRelated.eq(0).hide();
  }else{
     $payRelated.show();
  }
})
//------------------------添加供应商----------------
var $supplierContainer = $('#supplier-list-container li');
var $delItem = $('.del-item');
var $Jadd = $('.J-add-supplier');
var $suppliertpl = $$include('/partials/add-supplier');
var $addSupplier = $('.j-modal-ok');
var supplierDialog =new Dialog({
  title:"添加供应商",
  size:Dialog.SIZELG,
  content:$suppliertpl,
  btnsTxt:{
    stxt:"添加选中供应商"
  },
  onOk:function(){
    //这个地方写选中后的添加操作
  }
});
$Jadd.on('click',function(){
  supplierDialog.show();
});
$('#supplier-search-list')
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
      title: '编号',
      field: ''
    }, {
      title: '供应商',
      field: ''
    }, {
      title: '所作地区',
      field: ''
    }, {
      title: '开票类型',
      field: ''
    }, {
      title: '税率',
      field: ''
    }, {
      title: '评价等级',
      field: ''
    },{
      title: '供应等级',
      field: ''
    }],
    clickToSelect: true,
    pagination: true
  });

$supplierContainer.on('click','.del-item',function(){
  $(this).parent().remove()
})