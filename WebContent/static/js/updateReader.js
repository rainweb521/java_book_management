
/**
 * ajax提交修改管理员的信息
 * @param {Object} '#updateReader'
 */
$(function () {
	

    $('#updateReader').click(function () {

    	
    	if (!validUpdateReader()) {
            return;
        }
    	
	var postdata = "readerId="+$.trim($("#updateReaderID").val())+"&readerType="+$.trim($("#updateReaderType").val())
	+"&name="+$.trim($("#updateName").val())+"&phone="+ $.trim($("#updatePhone").val())+"&email="+ $.trim($("#updateEmail").val())
	+"&paperNO="+ $.trim($("#updatePaperNO").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/readerManageAction_updateReader.action',
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
 * 显示修改前的数据在输入框中
 * @param {Object} id
 */
function updateReader(id){
		$("#updateReaderType option[value!=-1]").remove();//移除先前的选项
	ajax(
		  {
	    		url:"admin/readerTypeManageAction_getAllReaderTypes.action",
	    		type:"json",
	    		callback:function(data) {
					// 循环遍历每个读者分类，每个名称生成一个option对象，添加到<select>中
					for(var index in data) {
						var op = document.createElement("option");//创建一个指名名称元素
						op.value = data[index].readerTypeId;//设置op的实际值为当前的读者分类编号
						var textNode = document.createTextNode(data[index].readerTypeName);//创建文本节点
						op.appendChild(textNode);//把文本子节点添加到op元素中，指定其显示值
						
						document.getElementById("updateReaderType").appendChild(op);
					}
						ajax(
				    			  {
								  	method:'POST',
						    		url:'admin/readerManageAction_getReader.action',
									params: "readerId=" + id,
									type:"json",
						    		callback:function(data) {
										$("#updateReaderID").val(data.readerId);
										$("#updatePaperNO").val(data.paperNO);
										$("#updateName").val(data.name);
										$("#updateEmail").val(data.email);
										$("#updatePhone").val(data.phone);
										$("#updateReaderType").val(data.readerType.readerTypeId);
									}
								}
					   
		    			);
				}
				
			
				
				
		   }
	);
	
			

}



function validUpdateReader() {
    var flag = true;

    var paperNO = $.trim($("#updatePaperNO").val());
    if (paperNO == "") {
        $('#updatePaperNO').parent().addClass("has-error");
        $('#updatePaperNO').next().text("请输入读者证件号");
        $("#updatePaperNO").next().show();
        flag = false;
    }else {
        $('#updatePaperNO').parent().removeClass("has-error");
        $('#updatePaperNO').next().text("");
        $("#updatePaperNO").next().hide();
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

	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	var email = $.trim($("#updateEmail").val());
	if(email == ""){
		 $('#updateEmail').parent().addClass("has-error");
        $('#updateEmail').next().text("请输入邮箱");
        $("#updateEmail").next().show();
        flag = false;
	}else if(!reg.test(email)){ 
		//邮箱格式的校验
         $('#updateEmail').parent().addClass("has-error");
        $('#updateEmail').next().text("邮箱格式有误");
        $("#updateEmail").next().show();  
        return false; 
    }else {
        $('#updateEmail').parent().removeClass("has-error");
        $('#updateEmail').next().text("");
        $("#updateEmail").next().hide();
    } 
	
	
	
	var readerType = $.trim($("#updateReaderType").val());
	if(readerType == -1){
		 $('#updateReaderType').parent().addClass("has-error");
        $('#updateReaderType').next().text("请选择读者类型");
        $("#updateReaderType").next().show();
        flag = false;
	}else {
        $('#updateReaderType').parent().removeClass("has-error");
        $('#updateReaderType').next().text("");
        $("#updateReaderType").next().hide();
    } 
	
    return flag;
}





function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


