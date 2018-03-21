function addBookNum(id,isbn){
	
	$("#addBookNumId").val(id);
	$("#addBookNumISBN").val(isbn);
}


$(function () {
	

    $('#add_BookNum').click(function () {

    	
    	if (!validAddBookNum()) {
            return;
        }
	var postdata = "bookId="+$.trim($("#addBookNumId").val())+"&num="+$.trim($("#addBookNum").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/bookManageAction_addBookNum.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#addNumModal").modal("hide");//关闭模糊框		
						showInfo("新增成功");	

	                }else {
						$("#addNumModal").modal("hide");//关闭模糊框
						showInfo("新增失败");
					}
								
				}
			}
			   
    	);
			
		
	});
	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});



function validAddBookNum() {
    var flag = true;

    var num = $.trim($("#addBookNum").val());
    if (num == "") {
        $('#addBookNum').parent().addClass("has-error");
        $('#addBookNum').next().text("请输入新增图书数量");
        $("#addBookNum").next().show();
        flag = false;
    }else if(num<=0 || num!=parseInt(num)){
    	$('#addBookNum').parent().addClass("has-error");
        $('#addBookNum').next().text("图书数量必须为正整数");
        $("#addBookNum").next().show();
        flag = false;
	} else {
        $('#addBookNum').parent().removeClass("has-error");
        $('#addBookNum').next().text("");
        $("#addBookNum").next().hide();
    }


    return flag;
}


function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}
