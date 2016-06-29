import Tooltip from 'tooltip';
$('[data-toggle="tooltip"]').tooltip();
//用户执行选中价格
$('.list-container').on('click', '.prSelect', function(){
	if( $(this).is(':checked') ) {
		var dataId = $(this).attr('data-id');
		removeBargain(dataId);
		$(this).prop('checked',true).parent().addClass('bargain');
	}else {
		$(this).parent().removeClass('bargain');
	}
})
 //用户执行成交供应商
.on('click', '.proveOk', function() {
	var $proveTr = $(this).parent().parent();
	$proveTr.find('input[type="checkbox"][class="prSelect"]').each(function(e,obj) {
	    	if($(this).is(':checked'))
	    	{
	    		var dataId = $(this).attr('data-id');
	    		var dataInfo = $(this).attr('data-info')
	    		$(this).parent().find('input[name="'+dataId+'"]').val(dataInfo);
	    		$(this).parent().find('span').html('已经成交');
	    		removeCheckboxs(dataId);
	    	}
	});
});
//清除背景颜色和其他相关的选择框
function removeBargain( dataId ){
	$('.list-container').find('input[type="checkbox"][data-id="'+dataId+'"]').each(function(e,obj) {
	    	$(obj).removeAttr('checked').parent().removeClass('bargain');
	});
}
//清除checkbox的选择框
function removeCheckboxs( dataId ){
	$('.list-container').find('input[type="checkbox"][data-id="'+dataId+'"]').each(function(e,obj) {
	    	$(this).remove();
	});
}