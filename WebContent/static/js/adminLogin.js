$(function () {
	
	
    $('#login_submit').click(function () {
        if (!validLogin()) {
            return;
        }
		
		
	var postdata = "username="+$.trim($("#username").val())+"&pwd="+ $.trim($("#password").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'adminLoginAction_login.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						//管理员
	                    window.location.href = "admin/admin.jsp";
	                } else if (data == -1) {
	                    showInfo("账号不存在");
	                } else if (data == -2) {
	                    showInfo("密码错误");
	                } else {
	                    showInfo("登录失败，请重试");
	                }
								
				}
			}
			   
    	);
			
		
	});
	
		
		
		var alert = $('.alert');
	    var formWidth = $('.bootstrap-admin-login-form').innerWidth();
	    var alertPadding = parseInt($('.alert').css('padding'));
	    if (isNaN(alertPadding)) {
	        alertPadding = parseInt($(alert).css('padding-left'));
	    }
	    $('.alert').width(formWidth - 2 * alertPadding);

});

function validLogin() {
    var flag = true;

    var username = $.trim($("#username").val());
    if (username == "") {
        $('#username').parent().addClass("has-error");
        $('#username').next().text("请输入账号");
        $("#username").next().show();
        flag = false;
    } else if (username.length<2 || username.length > 15) {
        $("#username").parent().addClass("has-error");
        $("#username").next().text("账号长度必须在2~15之间");
        $("#username").next().show();
        flag = false;
    } else {
        $('#username').parent().removeClass("has-error");
        $('#username').next().text("");
        $("#username").next().hide();
    }

    var password = $.trim($("#password").val());
    if (password == "") {
        $('#password').parent().addClass("has-error");
        $('#password').next().text("请输入密码");
        $("#password").next().show();
        flag = false;
    } else if (password.length<3 || password.length > 15) {
        $("#password").parent().addClass("has-error");
        $("#password").next().text("密码长度必须在3~15之间");
        $("#password").next().show();
        flag = false;
    } else {
        $('#password').parent().removeClass("has-error");
        $('#password').next().text("");
        $("#password").next().hide();
    }
    return flag;
}

function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}