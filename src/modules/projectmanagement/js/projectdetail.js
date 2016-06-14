import Dialog from 'dialog';

var editMember = $(".J-edit-member"),
    delMember = $(".J-del-member"),
    addMember = $(".J-add-project-member");
    // 编辑
    editMember
      .on("click",function(){
        $(this).parents("tr").find("span").hide();
        $(this).parents("tr").find(".hide-container").show();
      });
      // 删除
    delMember
      .on("click",function(){
        $(this).parents("tr").remove();
      })