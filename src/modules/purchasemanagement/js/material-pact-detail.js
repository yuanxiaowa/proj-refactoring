import 'trfileUpload';
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


