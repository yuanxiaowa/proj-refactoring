$('.more-selected').on('click', '.Review_Status_all', function(){
  if( $(this).is(':checked') ) {
    $(this).parents('.more-selected').find('input[type="checkbox"]').prop('checked',true);
  }else {
    $(this).parents('.more-selected').find('input[type="checkbox"]').prop('checked',false);
  }
})
$('.more-selected').on('click', '.regul', function(){
    $(this).parents('.more-selected').find('.Review_Status_all').prop('checked',false);
})