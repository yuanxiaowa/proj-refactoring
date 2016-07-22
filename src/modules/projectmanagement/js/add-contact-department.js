import formValidation from 'formValidation';
import 'bootstrapDatetimepicker';
import Linkage from 'linkage';

var $pAdd = $('.add-table');
var itemTable = ['name', 'sex', 'birthDate', 'position', 'emailAddress', 'mobileNo', 'officeTelephoneNo', 'department', 'address'];
var itemTableL = itemTable.length;
var inpuName ;
var ProcessNum = $pAdd.parent().prev().find('table tbody').children().length;

function getTemp(inums) {
	var trs = '<tr>';
	var ic ;
	var inumsp = inums +1;
  trs += '<td>'+inumsp+'</td>';
    for(ic=0;ic<itemTableL;ic++) {
     	 inpuName ='ContactPerson['+inums+'].'+itemTable[ic];
       if('birthDate' == itemTable[ic] ) {
        trs += '<td><input type="text" date="true" name="'+inpuName+'" class="form-control" ></td>';
      }else {
        trs += '<td><input type="text" name="'+inpuName+'" class="form-control" ></td>';
      }
     	 
    }
    trs += '<td><textarea class="form-control" name="ContactPerson['+inums+'].remark" ></textarea></td><td><a href="" class="J-del-number">删除</a></td></tr>';
    return trs;
}

$pAdd.on('click', '.J-add-number', function () {
          var $tbody = $(this).parent().prev().find('table tbody');
          var $tabstr = $(getTemp(ProcessNum));
          ProcessNum++;
          $tbody.append( $tabstr );
        //引入时间
          $tabstr.find('input[date]').datetimepicker({
          format: 'yyyy-mm-dd',
          autoclose: true,
          minView: 2
          });
        }).prev().on('click', '.J-del-number', function (e) {
          $(this).closest('tr').remove();
          e.preventDefault();
        });
//成立日期
$('input[date]').datetimepicker({
  format: 'yyyy-mm-dd',
  autoclose: true,
  minView: 2
});


