import 'bootstrapDatetimepicker';
import webUploader from 'webUploader';
import 'trfileUpload';
//------------------------时间引入----------------
//材料清单
var $tabs1 = $('#tab1');
var $addTrs1 = $tabs1.find('.add-cos');
var ProcessNum1 = $addTrs1.parents('.table-responsive').find('table tbody').children().length+1;
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
	}).on('click', '.J-del-number', function () {
	    $(this).closest('tr').remove();
	});

	//新增一行dom | 材料清单
	var marTrInputName = ['no1' ,'no2' ,'no3' ,'no4' ,'no5' ,'no6' ,'no7' ,'no8' ,'no9' ,'no10' ,'no11' ];//临时名称,使用前请更换
	var attchTrInputName = ['fno1' ,'fno2' ,'fno3' ,'fno4' ];//临时名称,使用前请更换
	function getTemp(inums,types) {
	  var inu =0;
	  var trStr = ''; 
	  var trInputName = [];
	  var trType = types;
	  if(trType ==1 ) {
	  	 var trStr = '<tr><td>'+inums+'</td>'; 
	  	trInputName = marTrInputName;
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
		 trStr += '<td><a href="javascript:;" class="btn btn-default J-del-number">删除</a></td></tr>';
	  }else {
		trInputName = attchTrInputName;
		trStr += '<tr><td>'+inums+'</td><td><input type="text" name="filenum" class="form-control" ></td><td class="filenametd"></td><td class="filebytd"></td><td class="filedatetd"></td><td><a class="btn btn-primary up-btn">上传</a>  <input type="hidden" name="filenametmp" class="filenametmp"/><input type="hidden" name="filedatetmp" class="filedatetmp"/><input type="hidden" name="filebytmp" class="filebytmp"/><a href="javascript:;" class="J-del-number btn btn-default">删除</a></td></tr>';
	  }
	  return trStr;
	}
//已有数据新增时间插件
 $('input[date]').datetimepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
   });