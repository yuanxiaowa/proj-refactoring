import 'bootstrapDatetimepicker';

//------------------------时间引入----------------
//材料清单
var $tabs1 = $('#tab1');
var $tabs2 = $('#tab2');
var $addTrs1 = $tabs1.find('.add-cos');
var $addTrs2 = $tabs2.find('.add-cos');
var ProcessNum1 = $addTrs1.parents('.table-responsive').find('table tbody').children().length+1;
var ProcessNum2 = $addTrs2.parent().find('table tbody').children().length+1;
//tab1 新增表格
	$tabs1.on('click', '.add-cos' , function () {
	   var $tbody = $(this).parents('.table-responsive').find('table tbody');
	   var $tmp = $(getTemp(ProcessNum1,1));
	   $tbody.append($tmp);
	   $tmp.find('input[date]').datetimepicker({
	      format: 'yyyy-mm-dd',
	      autoclose: true,
	      minView: 2
	   });
	   ProcessNum1++;
	//删除一行
	}).on('click', '.J-del-item', function () {
	    $(this).closest('tr').remove();
	});
//tab2 新增表格
	$tabs2.on('click', '.add-cos' , function () {
	   var $tbody = $(this).parent().find('table tbody');
	   var $tmp = $(getTemp(ProcessNum2,2));
	   $tbody.append($tmp);
	   $tmp.find('input[date]').datetimepicker({
	      format: 'yyyy-mm-dd',
	      autoclose: true,
	      minView: 2
	   });
	   ProcessNum2++;
	//删除一行
	}).on('click', '.J-del-item', function () {
	    $(this).closest('tr').remove();
	});
	//新增一行dom | 材料清单
	var marTrInputName = ['no1' ,'no2' ,'no3' ,'no4' ,'no5' ,'no6' ,'no7' ,'no8' ,'no9' ,'no10' ,'no11' ];//临时名称,使用前请更换
	var attchTrInputName = ['fno1' ,'fno2' ,'fno3' ,'fno4' ];//临时名称,使用前请更换
	function getTemp(inums,types) {
	  var inu =0;
	  var trStr = '<tr><td>'+inums+'</td>'; 
	  var trInputName = [];
	  var trType = types;
	  if(trType ==1 ) {
	  	trInputName = marTrInputName;
	  }else {
		trInputName = attchTrInputName;
	  }
	  for( inu=0; inu<trInputName.length; inu++ )
	  {
	      switch(inu)
	      {
	        case 3:
	              trStr += '<td><div class="input-group"><input type="text" class="form-control" date="true"></div></td>';
	              break;
	        default:
	        	  trStr += '<td><div class="input-group"><input type="text" class="form-control"></div></td>';
	        	  break;
	      }
	 }
	 trStr += '<td><a href="javascript:;" class="btn btn-default J-del-item">删除</a></td></tr>';
	  return trStr;
	}
//已有数据新增时间插件
 $('input[date]').datetimepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
   });