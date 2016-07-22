/*
* @Author: huangzexia
* @Date:   2016-07-01 13:55:57
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-12 19:45:48
*/
import 'print';
import 'bootstrapTable';
import 'trfileUpload';
import Dialog from 'dialog';

//------------------------付款清单----------------
$('#pay-list')
  .bootstrapTable({
    url: 'data/pay',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
    search: false,
    clickToSelect: true,
    showColumns:true,
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
      align: 'center',
      field: 'Num'
    }, {
      title: '类型',
      align: 'center',
      field: 'type'
    }, {
      title: '验收/退货编号',
      align: 'center',
      field: 'bankNum'
    }, {
      title: '材料类型',
      align: 'center',
      field: 'cl'
    }, {
      title: '验收总额',
      align: 'center',
      field: 'Sum'
    }, {
      title: '发票总额',
      align: 'center',
      field: 'taxPrice'
    }, {
      title: '税额',
      align: 'center',
      field: 'tax'
    }, {
      title: '不含税额',
      align: 'center',
      field: 'hasPay'
    }, {
      title: '验收人',
      align: 'center',
      field: 'payRatio'
    }, {
      title: '验收日期',
      align: 'center',
      field: 'time'
    }, {
      title: '编制日期',
      align: 'center',
      field: 'Time'
    }, {
      title: '备注',
      align: 'center',
      field: 'bz'
    }]
  });
//------------------------发票信息----------------
$('#tax-list')
  .bootstrapTable({
    url: 'data/tax',
    sidePagination: 'server',
    toolbar: '#toolbar',
    pagination: true,
    search: false,
    clickToSelect: true,
    showColumns:true,
    ajaxOptions: {
      dataFilter(res) {
        return JSON.stringify($.parseJSON(res).data);
      }
    },
    columns: [ {
      title: '编号',
      align: 'center',
      field: 'Num'
    }, {
      title: '对应收退货单',
      align: 'center',
      field: 'bankNum'
    }, {
      title: '发票类型',
      align: 'center',
      field: 'type'
    }, {
      title: '开票单位',
      align: 'center',
      field: 'dw'
    }, {
      title: '发票金额',
      align: 'center',
      field: 'Sum'
    }, {
      title: '税率',
      align: 'center',
      field: 'taxPrice'
    }, {
      title: '税额',
      align: 'center',
      field: 'tax'
    }, {
      title: '不含税价',
      align: 'center',
      field: 'hasPay'
    }, {
      title: '发票代码',
      align: 'center',
      field: 'dm'
    }, {
      title: '开票日期',
      align: 'center',
      field: 'time'
    }, {
      title: '图片',
      align: 'center',
      field: 'Time'
    }, {
      title: '备注',
      align: 'center',
      field: 'bz'
    }, {
      title: '发票状态',
      align: 'center',
      field: 'sta'
    }]
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