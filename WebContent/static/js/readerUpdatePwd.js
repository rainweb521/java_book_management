
$(function () {
	
	
    $('#update_readerPwd').click(function () {

     if (!validUpdateReaderPwd()) {
 	        return;
 	 }
    	
	var postdata = "oldPwd="+$.trim($("#oldPwd").val())+"&newPwd="+ $.trim($("#newPwd").val())+"&confirmPwd="+ $.trim($("#confirmPwd").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'reader/readerInfoAction_readerPwd.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#updatepwd").modal("hide");//关闭模糊框		
						showInfo("修改成功");	
	                    
	                }else if (data == 0) {
	                    showInfo("确认密码不一致");
	                }else if(data == -1){
						 showInfo("原密码错误");
					}else{
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


function validUpdateReaderPwd() {
    var flag = true;


    var oldPwd = $.trim($("#oldPwd").val());
    if (oldPwd == "") {
        $('#oldPwd').parent().addClass("has-error");
        $('#oldPwd').next().text("请输入密码");
        $("#oldPwd").next().show();
        flag = false;
    } else if (oldPwd.length<3 || oldPwd.length > 15) {
        $("#oldPwd").parent().addClass("has-error");
        $("#oldPwd").next().text("密码长度必须在3~15之间");
        $("#oldPwd").next().show();
        flag = false;
    } else {
        $('#oldPwd').parent().removeClass("has-error");
        $('#oldPwd').next().text("");
        $("#oldPwd").next().hide();
    }
	
    
    var newPwd = $.trim($("#newPwd").val());
    if (newPwd == "") {
        $('#newPwd').parent().addClass("has-error");
        $('#newPwd').next().text("请输入新密码");
        $("#newPwd").next().show();
        flag = false;
    } else if (newPwd.length<3 || newPwd.length > 15) {
        $("#newPwd").parent().addClass("has-error");
        $("#newPwd").next().text("新密码长度必须在3~15之间");
        $("#newPwd").next().show();
        flag = false;
    } else {
        $('#newPwd').parent().removeClass("has-error");
        $('#newPwd').next().text("");
        $("#newPwd").next().hide();
    }
    
    
    var confirmPwd = $.trim($("#confirmPwd").val());
    if (confirmPwd == "") {
        $('#confirmPwd').parent().addClass("has-error");
        $('#confirmPwd').next().text("请输入密码");
        $("#confirmPwd").next().show();
        flag = false;
    } else if (confirmPwd.length<3 || confirmPwd.length > 15) {
        $("#confirmPwd").parent().addClass("has-error");
        $("#confirmPwd").next().text("密码长度必须在3~15之间");
        $("#confirmPwd").next().show();
        flag = false;
    }else if (confirmPwd!=newPwd) {
        $("#confirmPwd").parent().addClass("has-error");
        $("#confirmPwd").next().text("确认密码不一致");
        $("#confirmPwd").next().show();
        flag = false;
    } else {
        $('#confirmPwd').parent().removeClass("has-error");
        $('#confirmPwd').next().text("");
        $("#confirmPwd").next().hide();
    }
	

	
    return flag;
}



function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}