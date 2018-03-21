
/**
 * ajax提交修改管理员的信息
 * @param {Object} '#updateAdmin'
 */
$(function () {
	

    $('#updateAdmin').click(function () {

    	
   	 if (!validUpdateAdmin()) {
         return;
     }
    	
	var postdata = "id="+$.trim($("#updateId").val())+"&username="+$.trim($("#updateUsername").val())+"&name="+$.trim($("#updateName").val())+"&phone="+ $.trim($("#updatePhone").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/adminManageAction_updateAdmin.action',
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
 * 获取需要修改用户信息
 * @param {Object} username 需要修改的用户名
 */
function updateAdmin(id){
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/adminManageAction_getAdmin.action',
				params: "id=" + id,
				type:"json",
	    		callback:function(data) {
					$("#updateId").val(data.aid);
					$("#updateUsername").val(data.username);
					$("#updateName").val(data.name);
					$("#updatePhone").val(data.phone);
					$("#updatePwd").val(data.pwd);
								
				}
			}
			   
    	);
			

}


function validUpdateAdmin() {
    var flag = true;

    var username = $.trim($("#updateUsername").val());
    if (username == "") {
        $('#updateUsername').parent().addClass("has-error");
        $('#updateUsername').next().text("请输入用户名");
        $("#updateUsername").next().show();
        flag = false;
    } else if (username.length<2 || username.length > 15) {
        $("#updateUsername").parent().addClass("has-error");
        $("#updateUsername").next().text("用户名长度必须在2~15之间");
        $("#updateUsername").next().show();
        flag = false;
    } else {
        $('#updateUsername').parent().removeClass("has-error");
        $('#updateUsername').next().text("");
        $("#updateUsername").next().hide();
    }

	
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");	
	var name = $.trim($("#updateName").val());
	if(name == ""){
		 $('#updateName').parent().addClass("has-error");
        $('#updateName').next().text("请输入真实姓名");
        $("#updateName").next().show();
        flag = false;
	}else if(!reg.test(name)){
		 $('#updateName').parent().addClass("has-error");
        $('#updateName').next().text("真实姓名必须为中文");
        $("#updateName").next().show();
		 flag = false;
	}else {
        $('#updateName').parent().removeClass("has-error");
        $('#updateName').next().text("");
        $("#updateName").next().hide();
    }
	
	var phone = $.trim($("#updatePhone").val());
	if(phone == ""){
		 $('#updatePhone').parent().addClass("has-error");
        $('#updatePhone').next().text("请输入联系号码");
        $("#updatePhone").next().show();
        flag = false;
	}else if(!(/^1[34578]\d{9}$/.test(phone))){ 
		//电话号码格式的校验
         $('#updatePhone').parent().addClass("has-error");
        $('#updatePhone').next().text("手机号码有误");
        $("#updatePhone").next().show();  
        return false; 
    }else {
        $('#updatePhone').parent().removeClass("has-error");
        $('#updatePhone').next().text("");
        $("#updatePhone").next().hide();
    } 

	
    return flag;
}



function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


