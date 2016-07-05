/*
* @Author: huangzexia
* @Date:   2016-07-01 13:55:57
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-01 15:39:02
*/
import 'print';
import 'bootstrapTable';
import 'trfileUpload';
import Dialog from 'dialog';

//------------------------付款清单----------------
$('#pay-list')
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
      title: '类型',
      field: ''
    }, {
      title: '验收/退货编号',
      field: ''
    }, {
      title: '材料类型',
      field: ''
    }, {
      title: '验收总额',
      field: ''
    }, {
      title: '发票总额',
      field: ''
    }, {
      title: '税额',
      field: ''
    }, {
      title: '不含税额',
      field: ''
    }, {
      title: '验收人',
      field: ''
    }, {
      title: '验收日期',
      field: ''
    }, {
      title: '编制日期',
      field: ''
    }, {
      title: '备注',
      field: ''
    }],
    clickToSelect: true
  });
//------------------------发票信息----------------
$('#tax-list')
  .bootstrapTable({
    url: '',
    sidePagination: 'server',
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [ {
      title: '编号',
      field: ''
    }, {
      title: '对应收退货单',
      field: ''
    }, {
      title: '发票类型',
      field: ''
    }, {
      title: '开票单位',
      field: ''
    }, {
      title: '发票金额',
      field: ''
    }, {
      title: '税率',
      field: ''
    }, {
      title: '税额',
      field: ''
    }, {
      title: '不含税价',
      field: ''
    }, {
      title: '发票代码',
      field: ''
    }, {
      title: '开票日期',
      field: ''
    }, {
      title: '图片',
      field: ''
    }, {
      title: '备注',
      field: ''
    }, {
      title: '发票状态',
      field: ''
    }],
    clickToSelect: true
  });
//------------------------打印----------------
var $printGoodsltpl = $$include('/partials/pay-apply-table');
var $printBtn = $(".J-print");
var printDialog =new Dialog({
    title:"打印付款审批表",
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