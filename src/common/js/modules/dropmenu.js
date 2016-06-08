export default function($dropmenu, cb) {
  $dropmenu
    .on('mouseover', 'li', function() {
      var $this = $(this);
      if (!$this.hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active');
      }
    }).on('click', 'li', function() {
      $dropmenu.hide();
      if (cb) {
        cb();
      }
    });
};
