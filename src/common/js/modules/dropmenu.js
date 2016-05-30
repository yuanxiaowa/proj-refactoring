$dropmenu
  .on('mouseover', 'li', function() {
    var $this = $(this);
    if (!$this.hasClass('active')) {
      $(this).addClass('active').siblings().removeClass('active');
    }
  });