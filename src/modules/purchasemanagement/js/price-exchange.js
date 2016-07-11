$('[data-toggle="tooltip"]').tooltip();
 //用户执行成交供应商
$('.list-container').on('click', '.proveOk', function() {
	var $proveTr = $(this).parent().parent();
	$proveTr.find('td').each(function(e,obj) {
	    	if( $(this).hasClass('check-ico') ) {
	    		var dataId = $(this).attr('data-id');
	    		$(this).find('input[type="hidden"]').val(dataId);
	    		var hsCheckedName = $(this).find('input[type="hidden"]').attr('name');
	    		removeOtherclicks(hsCheckedName);
	    	}
	    	else{
	    		$(this).find('input[name="'+dataId+'"]').val('');	
	    	}
	});
})
//用户执行选中价格
.on('click', '.tips', function() {
	if( ! $(this).hasClass('proveOver') ) {
		var $proveTr = $(this).parent();
		var dataId = $(this).attr('data-id');
		var inputName = $(this).find('input[type="hidden"]').attr('name');
		$(this).parent().find('input[name="'+inputName+'"]').val(dataId);
		removeAllCheckboxs(inputName);
		$(this).find('span').html('已经成交');
		$(this).addClass('check-ico');
	}
	return;
});
//清除checkbox的选择框
function removeAllCheckboxs( inputName ) {
	$('.list-container').find('input[name="'+inputName+'"]').each(function(e,obj) {
	    	$(this).parent().removeClass('check-ico');
	    	var tempVal = $(this).parent().attr('data-id');
	    	$(this).parent().find('span').html(tempVal);
	});
}
//取消已经选中的td点击属性
function removeOtherclicks( hsCheckedName ) {
	$('.list-container').find('input[name="'+hsCheckedName+'"]').each(function(e,obj) {
	    	$(this).parent().addClass('proveOver');
	});
}