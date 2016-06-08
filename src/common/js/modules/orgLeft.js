var $orgLeft = $('#org-left');

$('#org-menu')
  .on('click', '.org-menu-item', function(e) {
    e.stopPropagation();
    $(this).toggleClass('is-open');
  });
$orgLeft.on('click', '.j-org-op', () => {
  $orgLeft.toggleClass('is-close');
});