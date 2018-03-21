
/**
 * ajax提交添加图书分类的信息
 * @param {Object} '#addBookType'
 */
$(function () {
	

    $('#addBookType').click(function () {

    	
    	if (!validAddBookType()) {
            return;
        }
    	
	var postdata = "typeName="+$.trim($("#addBookTypeName").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/bookTypeManageAction_addBookType.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#addModal").modal("hide");//关闭模糊框		
						showInfo("添加成功");	

	                }else if (data == -1) {
						$("#addModal").modal("hide");//关闭模糊框		
						showInfo("该图书分类存在");	
					}else {
						$("#addModal").modal("hide");//关闭模糊框
						showInfo("添加失败");
					}
								
				}
			}
			   
    	);
			
		
	});
	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});



function validAddBookType() {
    var flag = true;

    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");	
	var bookType = $.trim($("#addBookTypeName").val());
	if(bookType == ""){
		 $('#addBookTypeName').parent().addClass("has-error");
        $('#addBookTypeName').next().text("请输入图书分类名称");
        $("#addBookTypeName").next().show();
        flag = false;
	}else if(!reg.test(bookType)){
		$('#addName').parent().addClass("has-error");
        $('#addName').next().text("图书分类名称必须为中文");
        $("#addName").next().show();
        flag = false;
	}else {
        $('#addBookTypeName').parent().removeClass("has-error");
        $('#addBookTypeName').next().text("");
        $("#addBookTypeName").next().hide();
    }
	
	
	
	
    return flag;
}






function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


