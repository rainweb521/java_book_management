
/**
 * ajax提交修改图书分类的信息
 * @param {Object} '#updateBookType'
 */
$(function () {
	

    $('#updateBookType').click(function () {

    	
    	if (!validUpdateBookType()) {
            return;
        }
    	
	var postdata = "id="+$.trim($("#updateBookTypeId").val())+"&typeName="+$.trim($("#updateBookTypeName").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/bookTypeManageAction_updateBookType.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#updateModal").modal("hide");//关闭模糊框		
						showInfo("修改成功");	

	                }else {
						$("#updateinfo").modal("hide");//关闭模糊框
	                    showInfo("修改失败");
	                }
								
				}
			}
			   
    	);
			
		
	});
	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});






/**
 * 获取需要修改图书分类信息
 * @param {Object} id 需要修改的图书分类id
 */
function updateBookType(id){
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/bookTypeManageAction_getBookType.action',
				params: "id=" + id,
				type:"json",
	    		callback:function(data) {
					$("#updateBookTypeId").val(data.typeId);
					$("#updateBookTypeName").val(data.typeName);
								
				}
			}
			   
    	);
			

}



function validUpdateBookType() {
    var flag = true;

    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");	
	var bookType = $.trim($("#updateBookTypeName").val());
	if(bookType == ""){
		 $('#updateBookTypeName').parent().addClass("has-error");
        $('#updateBookTypeName').next().text("请输入图书分类名称");
        $("#updateBookTypeName").next().show();
        flag = false;
	}else if(!reg.test(bookType)){
		$('#updateBookTypeName').parent().addClass("has-error");
        $('#updateBookTypeName').next().text("图书分类名称必须为中文");
        $("#updateBookTypeName").next().show();
        flag = false;
	}else {
        $('#updateBookTypeName').parent().removeClass("has-error");
        $('#updateBookTypeName').next().text("");
        $("#updateBookTypeName").next().hide();
    }
	
	
	
	
    return flag;
}



function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


