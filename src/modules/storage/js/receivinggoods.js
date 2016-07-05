/*
* @Author: huangzexia
* @Date:   2016-06-29 10:34:55
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-30 09:10:05
*/
import Dialog from 'dialog';
import 'print';
import webUploader from 'webUploader';
import 'bootstrapTable';
import 'trfileUpload';
//------------------------材料清单----------------
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
      field: 'checked',
      checkbox: true
    }, {
      title: '编号',
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
      title: '实际收货量',
      field: ''
    }, {
      title: '收货总额',
      field: ''
    }, {
      title: '验收情况',
      field: ''
    }, {
      title: '备注',
      field: ''
    }],
    clickToSelect: true
  });
//------------------------上传发票----------------
$('#tab2').on('click', function(){
  var uploader = webUploader.create({
      auto: true,
      swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
      pick: $('.upFile-btn'),
      server: 'data/fileupload',
      accept: {
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/*'
    }
  });
})

//------------------------打印----------------
var $printGoodsltpl = $$include('/partials/print-get-goods');
var $printBtn = $(".J-print");
var printDialog =new Dialog({
    title:"打印收货单",
    size:Dialog.SIZELG,
    content:$printGoodsltpl,
    btnsTxt:{
      stxt:"打印"
    }
  });
$printBtn.on("click",function(){
  printDialog.show()
})
$('.j-modal-ok').on('click',function(){
  $('.modal-content').jqprint();
})
