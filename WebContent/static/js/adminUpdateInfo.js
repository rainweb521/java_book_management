/**
 *管理员点击个人资料修改按钮触发进行ajax异步请求
 * @param {Object} '#admin_updateInfo'
 */

$(function () {
	
	
    $('#admin_updateInfo').click(function () {

    	
    	 if (!validUpdateAdminInfo()) {
    	        return;
    	    }
    	
	var postdata ="username="+$.trim($("#username").val())+"&name="+$.trim($("#name").val())+"&phone="+ $.trim($("#phone").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/adminInfoAction_adminInfo.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#updateinfo").modal("hide");//关闭模糊框		
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


function validUpdateAdminInfo() {
    var flag = true;

    var username = $.trim($("#username").val());
    if (username == "") {
        $('#username').parent().addClass("has-error");
        $('#username').next().text("请输入用户名");
        $("#username").next().show();
        flag = false;
    } else if (username.length<2 || username.length > 15) {
        $("#username").parent().addClass("has-error");
        $("#username").next().text("用户名长度必须在2~15之间");
        $("#username").next().show();
        flag = false;
    } else {
        $('#username').parent().removeClass("has-error");
        $('#username').next().text("");
        $("#username").next().hide();
    }

	
	
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");	
	var name = $.trim($("#name").val());
	if(name == ""){
		 $('#name').parent().addClass("has-error");
        $('#name').next().text("请输入真实姓名");
        $("#name").next().show();
        flag = false;
	}else if(!reg.test(name)){
		 $('#name').parent().addClass("has-error");
        $('#name').next().text("真实姓名必须为中文");
        $("#name").next().show();
		 flag = false;
	}else {
        $('#name').parent().removeClass("has-error");
        $('#name').next().text("");
        $("#name").next().hide();
    }
	
	var phone = $.trim($("#phone").val());
	if(phone == ""){
		 $('#phone').parent().addClass("has-error");
        $('#phone').next().text("请输入联系号码");
        $("#phone").next().show();
        flag = false;
	}else if(!(/^1[34578]\d{9}$/.test(phone))){ 
		//电话号码格式的校验
         $('#phone').parent().addClass("has-error");
        $('#phone').next().text("手机号码有误");
        $("#phone").next().show();  
        return false; 
    }else {
        $('#phone').parent().removeClass("has-error");
        $('#phone').next().text("");
        $("#phone").next().hide();
    } 

	
    return flag;
}


function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}