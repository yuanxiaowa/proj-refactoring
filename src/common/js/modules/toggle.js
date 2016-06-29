var $toggle = $('.J-toggle'),
     on = true;
    $('.list-title').on('click',function() {
      if(on) {
        $(this).next('.form-item-box').slideUp();
        $(this).children($toggle).html('展开+');
        on=false;
      }else {
        $(this).next('.form-item-box').slideDown();
        $(this).children($toggle).html('收起-');
        on = !on;
      }
    });