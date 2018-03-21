
$(function () {
	

	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});


function renewBook(id){
	var postdata = "borrowId="+id;
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/borrowManageAction_renewBook.action',
				params: postdata,
	    		callback:function(data) {
					if(data==1){
						showInfo("续借成功");
					}else if(data==-1){
						showInfo("该书已还,无法续借");
					}else if(data==-2){
						showInfo("该书续借过了,无法续借");
					}else if(data==-3){
						showInfo("已超续借期了,无法进行续借,请尽快去还书和缴纳罚金");
					}else if(data==-0){
						showInfo("续借失败");
					}
				}
			}
			   
    	);
			
		
	
}







function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


