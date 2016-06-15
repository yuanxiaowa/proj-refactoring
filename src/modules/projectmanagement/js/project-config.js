import render from 'render';


var $addNumber = $('.J-add-number');
var $numContainer = $(".number-wrap-container");
var $removeItem = $(".del-item");
var $addItem = $('.J-add-item ');
var $itemName = $('.J-project-item-name');
var $removeNumber = $('.J-remove-number');
var $getVal = $(".j-modal-ok");
var $listBox = $('.list-box')
var _tpl = $$include('/partials/project-1');
var $tpl = $(_tpl);
  //增加删除项目合同编号
  $.each($numContainer,function(index,ele){
    $(ele).on('click','.J-add-number',function(){
      $(this).parent('.number-wrap-container').next('.number-container').append($tpl);
    }).on('click','.J-remove-number',function(){
      var $item = $('.number-item');
      $item.remove();
    })
  })
  //增加各选项  
  var itemArr = ['项目状态','工程类别','联系单位类型','企业性质','项目合同税率','开票类型','合同类型','承包方式','计价方式','支付方式'];
  var iNum = '';
  $.each($addItem,function(index,ele){
    $(ele).on('click',function(){
      iNum = index;
      $itemName.html(itemArr[index])//动态设置弹出框对应的选项
      $('#add-item').modal('show');
    })
  })

  // 获取各项输入的值,放入页面
  $getVal
    .on('click',function(){
      var item = $('.item-val');
      var itemV = item.val();
      var html = '<div class="project-item">'+itemV+'<em class="del-item">×</em>'+'</div>';
      $listBox.eq(iNum).children($addItem).last().before(html);
      $('#add-item').modal('hide');
      item.val('');
    })
  //删除各选项
  $listBox
    .on('click','.del-item',function(){
      $(this).parent().remove();
    })

