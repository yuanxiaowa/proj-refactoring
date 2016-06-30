/*
* @Author: huangzexia
* @Date:   2016-06-29 10:34:55
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-06-29 18:53:48
*/
import Dialog from 'dialog';
import 'print';
import webUploader from 'webUploader';
import 'bootstrapTable';
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
var $btn = $('.upFile-btn');
var uploader = webUploader.create({
    auto: true,
    swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
    pick: $btn,
    server: 'data/fileupload',
    accept: {
    extensions: 'gif,jpg,jpeg,bmp,png',
    mimeTypes: 'image/*'
  }
});

//相关附件
//表格新增
function getTemp(inums) {
    return '<tr><td>'+inums+'</td><td><input type="text" name="filenum" class="form-control" ></td><td class="filenametd"></td><td class="filebytd"></td><td class="filedatetd"></td><td><a class="btn btn-primary up-btn">上传</a>  <input type="hidden" name="filenametmp" class="filenametmp"/><input type="hidden" name="filedatetmp" class="filedatetmp"/><input type="hidden" name="filebytmp" class="filebytmp"/><a href="javascript:;" class="J-del-number btn btn-default">删除</a></td></tr>';
}

var $upFileContainer = $('#tab3').find('.up-file-container');
var ProcessNum = $upFileContainer.find('table tbody').children().length+1;
$upFileContainer.on('click', '.add-cos', function () {
 
          var $tbody = $upFileContainer.find('table tbody');
          var $tmp = $(getTemp(ProcessNum));
          var $btn = $tmp.find('.up-btn');
          $tbody.append($tmp);
          ProcessNum++;
          //上传文件
          var uploader = webUploader.create({
              auto: true,
              swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
              pick: $btn,
              server: 'data/fileupload',
              accept: {
              extensions: 'gif,jpg,jpeg,bmp,png',
              mimeTypes: 'image/*'
              }
          });
          //文件上传成功
          uploader.on('uploadSuccess',function(file,response ){
              $btn.parent().parent().find('.filenametd').html(response.filename);
              $btn.parent().parent().find('.filebytd').html(response.fileby);
              $btn.parent().parent().find('.filedatetd').html(response.filedate);
              $btn.parent().find('.filenametmp').val(response.filename);
              $btn.parent().find('.filedatetmp').val(response.filedate);
              $btn.parent().find('.filebytmp').val(response.fileby);
          });
}).on('click', '.J-del-number', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
});

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
