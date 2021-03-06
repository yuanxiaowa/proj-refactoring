import 'bootstrapDatetimepicker';
import 'bootstrapTable';
import 'zTree';
import Dialog from 'dialog';
import webUploader from 'webUploader';
import 'toggle';
import 'modalRemote';

//---------------------- 材料搜索---------------
var $materialtpl = $$include('/partials/add-material');
var $choiceBtn = $('.input-group-addon');
var dialog = new Dialog({
  title: '选择材料',
  size: Dialog.SIZELG,
  content: $materialtpl,
  btnsTxt: {
    stxt: '确认'
  }
});
$choiceBtn.on('click', function() {
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
var zNodes = [{
  id: 1,
  pId: 0,
  name: '01人工',
  open: true
}, {
  id: 11,
  pId: 1,
  name: '0101人工'
}, {
  id: 111,
  pId: 11,
  name: '子节点111'
}, {
  id: 112,
  pId: 11,
  name: '子节点112'
}, {
  id: 113,
  pId: 11,
  name: '子节点113'
}, {
  id: 114,
  pId: 11,
  name: '子节点114'
}, {
  id: 22,
  pId: 2,
  name: '02黑色有色金属'
}, {
  id: 221,
  pId: 22,
  name: '水泥221'
}, {
  id: 222,
  pId: 22,
  name: '水泥222'
}, {
  id: 223,
  pId: 22,
  name: '水泥223'
}, {
  id: 224,
  pId: 22,
  name: '水泥224'
}, {
  id: 23,
  pId: 2,
  name: '03建材'
}, {
  id: 231,
  pId: 23,
  name: '建材231'
}, {
  id: 232,
  pId: 23,
  name: '建材232'
}, {
  id: 233,
  pId: 23,
  name: '建材233'
}, {
  id: 234,
  pId: 23,
  name: '建材234'
}];

function showIconForTree(treeId, treeNode) {
  return !treeNode.isParent;
}
$.fn.zTree.init($('#treeDemo'), setting, zNodes);

//---------------------- 引入采购计划---------------
let $btnAddPlan = $('#add-plan');
$btnAddPlan
  .on('loaded.modalremote', $modal => {
    var $table = $('#addPlan');
    var $title = ['编号', '采购部门', '采购项目', '计划编号', '材料类型', '计划总额', '计划月份', '项目地区'];
    var columns = [{
      checkbox: true,
      title: '选中'
    }];
    for (let i = 0; i < $title.length; i++) {
      columns.push({
        title: $title[i],
        field: `field${i}`
      });
    }

    function chkSubTable(isChecked) {
      var funcName = isChecked ? 'checkAll' : 'uncheckAll';
      return (row, $element) => {
        var $tr = $element.closest('tr').next();
        if ($tr.hasClass('detail-view')) {
          $tr.find('table').bootstrapTable(funcName);
        }
      };
    }

    function onChkSubTable(isChecked, index, $chk) {
      return () => {
        if (isChecked !== $chk.prop('checked')) {
          $chk.prop('checked', isChecked);
        }
      };
    }

    function getResults() {
      var arr = [];
      $table
        .children('tbody').children('.detail-view').find('table.table')
        .each((_, item) => {
          var $item = $(item);
          var rows = $item.bootstrapTable('getSelections');
          var prow = $item.data('rowDetail');
          if (0 < rows.length) {
            prow.children = rows;
          }
          arr.push(prow);
        });
      return arr;
    }

    $btnAddPlan
      .on('ok.modalremote', () => {
        // 点击确定，获取选择数据
        var data = getResults();
        console.log(data);
        $btnAddPlan.data('dialog').hide();
      });
    $table.bootstrapTable({
      columns,
      url: 'data/add-purchase-titems',
      detailView: true,
      pagination: true,
      sidePagination: 'server',
      checkboxHeader: false,
      responseHandler(res) {
        return res.data;
      },
      onCheck: chkSubTable(true),
      onUncheck: chkSubTable(false),
      detailFormatter(index, row, $detail) {
        var $chk = $($detail.context).closest('td').next().find('input:checkbox');
        var $subtable = $('<table>');
        $subtable
          .appendTo($detail)
          .data('rowDetail', row)
          .bootstrapTable({
            columns: columns,
            showHeader: false,
            url: 'data/add-purchase-titems',
            responseHandler(res) {
              return res.data.rows;
            },
            onCheckAll: onChkSubTable(true, index, $chk),
            onUncheckAll: onChkSubTable(false, index, $chk),
            onCheck(row, $element) {
              var $trs = $element.closest('tr').siblings().andSelf();
              var l = $trs.filter((_, item) => {
                return 0 < $(item).children().first().find('input:checked').length;
              });
              if (l.length === $trs.length) {
                $chk.prop('checked', true);
              }
            },
            onUncheck() {
              $chk.prop('checked', false);
            },
            onPostBody() {
              if ($chk.prop('checked')) {
                $subtable.bootstrapTable('checkAll');
              }
            }
          });
      }
    });
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
    }, {
      title: '税率',
      field: ''
    }, {
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
isChecked($issueCheck, $listWrap);
isChecked($payTimes, $payDate);
/**
 * [isChecked description] 是否被选中
 * @param  {[type]}  btn [description]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
function isChecked(btn, obj) {
  btn.on('click', function() {
    if ($(this).is(':checked')) {
      obj.show();
    } else {
      obj.hide();
    }
  })
}
//------------------------根据付款方式显示是否分期和定金比例----------------
var $payStyle = $('#payStyle');
var $payRelated = $('.pay-style-related');
$payStyle.change(function() {
    var styleVal = $(this).val();
    if (styleVal == 0) {
      $payRelated.show();
    } else if (styleVal == 1) {
      $payRelated.eq(1).show();
      $payRelated.eq(0).hide();
    } else if (styleVal == 2) {
      $payRelated.hide();
    } else if (styleVal == 3) {
      $payRelated.eq(1).show();
      $payRelated.eq(0).hide();
    } else {
      $payRelated.show();
    }
  })
  //------------------------添加供应商----------------
var $supplierContainer = $('#supplier-list-container li');
var $delItem = $('.del-item');
var $Jadd = $('.J-add-supplier');
var $suppliertpl = $$include('/partials/add-supplier');
var $addSupplier = $('.j-modal-ok');
var supplierDialog = new Dialog({
  title: '添加供应商',
  size: Dialog.SIZELG,
  content: $suppliertpl,
  btnsTxt: {
    stxt: '添加选中供应商'
  },
  onOk: function() {
    //这个地方写选中后的添加操作
  }
});
$Jadd.on('click', function() {
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
    }, {
      title: '供应等级',
      field: ''
    }],
    clickToSelect: true,
    pagination: true
  });

$supplierContainer.on('click', '.del-item', function() {
  $(this).parent().remove()
})