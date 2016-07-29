import 'trfileUpload';
import Dialog from 'dialog';


var $payCheck =$(".pay-style-check input");
var $payTab = $(".pay-style-tab");


$.each($payCheck,function(index,ele){
  $(ele).on('click',function(){
    switch (index) {
      case 0:
        $payTab.eq(0).hide();
        $payTab.eq(1).hide();
        break;
      case 1:
        $payTab.eq(0).show();
        $payTab.eq(1).hide();
        break;
      case 2:
        $payTab.eq(0).hide();
        $payTab.eq(1).show();
        break;
    }
  })
})

//---------------------- 审批意见---------------
var $approveOp = $('#approval-opinion');
var $approveOptpl = $$include('/partials/approve-opinion') ;
var approveDialog = new Dialog({
  title: '查看审批意见',
  size: Dialog.SIZENORMAL,
  content: $approveOptpl,
  btns: false
});
$approveOp.on('click',function(){
    approveDialog.show();
})

