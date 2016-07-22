let $openCloseBtn =$('.open-close-btn');
let $sliderContainer = $('.slider-container');
var on = true;
$openCloseBtn.on('click',function(){
  if(on && $(this).html('▼展开')){
    $(this).html('▲隐藏');
    $sliderContainer.css('height','auto');
    on = false;
  }else{
    $(this).html('▼展开');
    $sliderContainer.css('height','34px');
     on = !on;
  }
})
