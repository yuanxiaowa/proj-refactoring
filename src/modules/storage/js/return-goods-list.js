/*
* @Author: huangzexia
* @Date:   2016-06-29 15:38:26
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-30 09:09:36
*/
import Dialog from 'dialog';
import 'bootstrapTable';
import webUploader from 'webUploader';
import 'bootstrapDatetimepicker';
import 'print';
import 'trfileUpload';

$('#detailed-list')
  .bootstrapTable({
    url: '',
    sidePagination: 'server',
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [{
      title: '编号',
      field: ''
    }, {
      title: '收货单编号',
      field: ''
    }, {
      title: '订单编号',
      field: ''
    }, {
      title: '材料编码',
      field: ''
    }, {
      title: '材料名称',
      field: ''
    }, {
      title: '规格型号',
      field: ''
    }, {
      title: '单位',
      field: ''
    }, {
      title: '单价',
      field: ''
    }, {
      title: '退货数量',
      field: ''
    }, {
      title: '退货总额',
      field: ''
    }, {
      title: '备注',
      field: ''
    }]
  });

//------------------------上传发票----------------
$('#tab2').on('click', '.upFile-btn', function(){
  var uploader = webUploader.create({
      auto: true,
      swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
      pick: $(this),
      server: 'data/fileupload',
      accept: {
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/*'
    }
  });
})

//---------------------- 引入收货清单---------------
var $addPlan = $(".add-plan");
var $importListTpl = $$include('/partials/import-goods-list');
var $importListDialog =new Dialog({
    title:"引入收货清单",
    size:Dialog.SIZELG,
    content:$importListTpl,
    btnsTxt:{
      stxt:"添加选中材料"
    }
  });
$addPlan.on("click",function(){
  $importListDialog.show();
})
$('#importList')
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
      title: '收货单编号',
      field: ''
    }, {
      title: '订单编号',
      field: ''
    }, {
      title: '材料编码',
      field: ''
    }, {
      title: '材料名称',
      field: ''
    }, {
      title: '规格型号',
      field: ''
    }
    , {
      title: '单位',
      field: ''
    }
    , {
      title: '收货数量',
      field: ''
    }],
    clickToSelect: true,
    pagination: true
  });
//------------------------时间引入----------------
$('input[date]').datetimepicker(
  {
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
  }
  );
//------------------------打印----------------
var $printGoodsltpl = $$include('/partials/return-goods');
var $printBtn = $(".J-print");
var printDialog =new Dialog({
    title:"打印退货单",
    size:Dialog.SIZELG,
    content:$printGoodsltpl,
    btnsTxt:{
      stxt:"打印"
    }
  });
$printBtn.on("click",function(){
  printDialog.show()
})
$('.j-modal-ok').eq(1).on('click',function(){
  $('.modal-content').eq(1).jqprint();
})
//上传容器
