
//jquery获取复选框的值
function setPower(){
	   var power =[];    
	  $('input[name="power"]:checked').each(function(){    
		   power.push($(this).val());    
	  });    
 	if(power.length==0){
		alert("您没有选择任何的内容.");
	}else{
		//设置该管理员的权限
		var postdata = "id="+$.trim($("#aid").val())+"&power="+power;
		ajax(
    		  {
			  	method:'POST',
	    		url:'admin/authorizationAction_addAuthorization.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#powerModal").modal("hide");//关闭模糊框		
					//	showInfo("设置成功");	
					alert("设置成功");

	                }else {
						$("#powerModal").modal("hide");//关闭模糊框
						//	showInfo("设置失败");
						alert("设置失败");

					}
								
				}
			}
			   
    	);
		
		
		
	}
}
  
  
function power(id){
		//$('input[name="power"]').removeAttr("checked");
		//$('input[name=power]').attr("checked",null);
		//$("[name='power']").removeAttr("checked");//取消全选 
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/authorizationAction_getAuthorization.action',
				params: "id=" + id,
				type:"json",
	    		callback:function(data) {
					$("#aid").val(data.aid);
				//	$('input[name="power"]').removeAttr("checked");//取消全选
					if(data.typeSet!=0){
						$("#typeSet").attr("checked","checked");
					}
					if(data.bookSet!=0){
						$("#bookSet").attr("checked","checked");
					}

					if(data.readerSet!=0){
						$("#readerSet").attr("checked","checked");
					}
					if(data.borrowSet!=0){
						$("#borrowSet").attr("checked","checked");
					}
					if(data.backSet!=0){
						$("#backSet").attr("checked","checked");
					}	
					if(data.forfeitSet!=0){
						$("#forfeitSet").attr("checked","checked");
					}	
					if(data.sysSet!=0){
						$("#sysSet").attr("checked","checked");
					}		
				}
			}
			   
    	);
	
}

$(function () {
	//重新加载使得复选框的勾选状态正常显示
$('#powerModal').on('hide.bs.modal',function() {//权限选择模糊框隐藏时候触发
       location.reload();  	//刷新当前页面
 });
});



function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}

