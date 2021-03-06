import webUploader from 'webUploader';
function getfiletr(inums) {
    var inuNo = inums+1;
    return '<tr><td>'+inuNo+'</td><td><input type="text" name="attachmentList['+inums+'].documentCode" class="form-control" >'
            +'</td><td class="filenametd"></td><td class="filebytd"></td><td class="filedatetd"></td>'
            +'<td><a class="btn btn-primary up-btn">上传</a> '
            +' <input type="hidden" name="attachmentList['+inums+'].storageUrl" class="filenametmp"/>'
            +'<input type="hidden" name="attachmentList['+inums+'].documentSize" class="filedatetmp"/>'
            +'<input type="hidden" name="attachmentList['+inums+'].documentType" class="filebytmp"/>'
            +'<input type="hidden" name="attachmentList['+inums+'].documentName" class="filebytmp"/>'
            +'<a href="javascript:;" class="J-del-number btn btn-default">删除</a></td></tr>';
}
var $upFileContainer = $("#tab2,#tab3,#tab4").find('.up-file-container');
var ProcessNum = $upFileContainer.find('table tbody').children().length+1;
$upFileContainer.on('click', '.add-cos', function () {
    var $tbodys = $upFileContainer.find('table tbody');
    var $tmp = $(getfiletr(ProcessNum));
    var $btn = $tmp.find('.up-btn');
    $tbodys.append($tmp);
    ProcessNum++;
    //上传文件
    var uploader = webUploader.create({
    auto: true,
    swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
    pick: $btn,
    server: 'data/fileupload.json',
    accept: {
              extensions: 'rar,zip,doc,xls,docx,xlsx,pdf',
              mimeTypes: '.rar,.zip,.doc,.xls,.docx,.xlsx,.pdf'
            }
    });
//文件上传成功
uploader.on('uploadSuccess',function(file,response ){
            $btn.parent().parent().find('.filenametd').html(response.name);
            $btn.parent().parent().find('.filebytd').html(response.userName);
            $btn.parent().parent().find('.filedatetd').html(response.time);
            $btn.parent().find('.urltmp').val(response.path);
            $btn.parent().find('.sizetmp').val(response.size);
            $btn.parent().find('.typetmp').val(response.type);
            $btn.parent().find('.nametmp').val(response.name);
              });
}).on('click', '.J-del-number', function (e) {
              $(this).closest('tr').remove();
              e.preventDefault();
});
//# sourceMappingURL=trfileUpload.js.map