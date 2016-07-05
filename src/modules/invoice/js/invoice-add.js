/*
* @Author: huangzexia
* @Date:   2016-07-04 15:10:24
* @Last Modified by:   huangzexia
* @Last Modified time: 2016-07-04 15:10:41
*/
import 'bootstrapDatetimepicker';
//------------------------时间引入----------------
$('input[date]').datetimepicker(
  {
      format: 'yyyy-mm-dd',
      autoclose: true,
      minView: 2
  }
);