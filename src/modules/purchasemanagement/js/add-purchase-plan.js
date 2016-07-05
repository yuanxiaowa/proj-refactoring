import 'bootstrapDatetimepicker';
import 'bootstrapTable';
import 'zTree';
import 'toggle';
import Dialog from 'dialog';
import webUploader from 'webUploader';
import TableEdit from 'tableEdit';

//---------------------- 材料搜索---------------
var $materialtpl = $$include('/partials/add-material');
var $tblist = $('.table');

var dialog = new Dialog({
  title: '选择材料',
  size: Dialog.SIZELG,
  content: $materialtpl,
  btnsTxt: {
    stxt: '确认选择'
  }
});

var te = new TableEdit({
  $table: $tblist,
  $btnAdd: '.add-cos',
  url: 'data/add-purchase-plan-items',
  columns: [{
    type: 'genNum'
  }, {
    type: 'input',
    name: 'name1'
  }, {
    type: 'addon',
    name: 'name2',
    hasHidden: true
  }, {
    type: 'input',
    name: 'name3'
  }, {
    type: 'input',
    name: 'name4'
  }, {
    type: 'input',
    name: 'name5'
  }, {
    type: 'input',
    name: 'name6',
    attrs: {
      date: true
    }
  }, {
    type: 'input',
    name: 'name7'
  }, {
    type: 'input',
    name: 'name8'
  }, {
    type: 'input',
    name: 'name9'
  }, {
    type: 'input',
    name: 'name10'
  }, {
    type: 'input',
    name: 'name11'
  }, {
    type: 'input',
    name: 'name12'
  }, {
    type: 'delBtn',
    name: 'name13'
  }]
});

te.on('trAdded', $tr => {
  $tr.find('[date]').datetimepicker();
});

$tblist
  .on('click', '.input-group-addon', function() {
    dialog.show();
    return false;
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
var zNodes = [{
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
  id: 113,
  pId: 11,
  name: "子节点113"
}, {
  id: 114,
  pId: 11,
  name: "子节点114"
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
  id: 223,
  pId: 22,
  name: "水泥223"
}, {
  id: 224,
  pId: 22,
  name: "水泥224"
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
}];

function showIconForTree(treeId, treeNode) {
  return !treeNode.isParent;
};

$(document).ready(function() {
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
    search: true
  });

//---------------------- 添加供应商---------------
var $isAdd = $('.isAdd');
var $supplierContainer = $('#supplier-list-container li');
var $delItem = $('.del-item');
var $Jadd = $('.J-add-supplier');
var $suppliertpl = $$include('/partials/add-supplier');
var $addSupplier = $('.j-modal-ok');
var supplierDialog = new Dialog({
  title: "添加供应商",
  size: Dialog.SIZELG,
  content: $suppliertpl,
  btnsTxt: {
    stxt: "添加选中供应商"
  },
  onOk: function() {
    //这个地方写选中后的添加操作
  }
});
$isAdd.on('click', function() {
  if (this.checked) {
    $Jadd.show();
  } else {
    $Jadd.hide();
  }
})
$Jadd.on('click', function() {
  supplierDialog.show();
})
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
  //------------------------时间引入----------------
$('input[date]').datetimepicker();
//------------------------文件上传----------------
//上传图片
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
uploader.on('uploadSuccess', function(file, response) {
  var filenames = response.filename; //文件名|路径
  $btn.next('.fileNameSpan').text(filenames);
  $btn.parent().find('.fileName').val(filenames);
});