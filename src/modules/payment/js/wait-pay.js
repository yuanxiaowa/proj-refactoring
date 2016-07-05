/*
* @Author: huangzexia
* @Date:   2016-07-01 16:09:40
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-05 16:55:56
*/

import 'bootstrapTable';
import 'moreSelected';
//------------------------付款清单----------------
var $modaladd = $('#add-item');
var $selects;
$('table')
  .on('click', '.J-editBank', function(e,index) {
  $selects = $(this);
  $modaladd.modal('show');
  $modaladd.find('.item-val').val('');
})
  .bootstrapTable({
    url: 'data/list',
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
      field: 'Num',
      align: 'center'
    }, {
      title: '付款途径',
      field: 'payStyle',
      align: 'center'
    }, {
      title: '支付状态',
      field: 'paySta',
      align: 'center'
    }, {
      title: '银行回单号',
      field: 'bankNum',
      align: 'center',
      width: '14%',
      formatter(value) {
        var $text = `<input class="form-control edit-bankVal" value=${value} readonly/>`
        var $edit = `<a href="javascript:;" class="J-editBank input-group-addon">编辑</a>`
        var $wrap = `<div class="input-group">`+$text + $edit+`</div>`
        return $wrap;
      }
    }, {
      title: '所属部门',
      field: 'Section',
      align: 'center'
    }, {
      title: '所属项目',
      align: 'center',
      field: 'Project'
    }, {
      title: '付款单编号',
      align: 'center',
      field: 'payNum'
    }, {
      title: '材料合同',
      align: 'center',
      field: 'cPact'
    }, {
      title: '合同总额',
      align: 'center',
      field: 'Sum'
    }, {
      title: '累计收货总额',
      align: 'center',
      field: 'allSum'
    }, {
      title: '发票总额',
      align: 'center',
      field: 'taxPrice'
    }, {
      title: '已付金额',
      align: 'center',
      field: 'hasPay'
    }, {
      title: '已付比例',
      align: 'center',
      field: 'payRatio'
    }, {
      title: '申请支付金额',
      align: 'center',
      field: 'applyPay'
    }, {
      title: '编制日期',
      align: 'center',
      field: 'Time'
    }],
    clickToSelect: true,
    pagination: true,
    toolbar:"#toolbar"
});
$modaladd.on('click', '.j-modal-ok', function(){
        var item = $('.item-val');
        var itemV = item.val();
        $selects.parent().children('.edit-bankVal').val(itemV);
        $modaladd.modal('hide');
})