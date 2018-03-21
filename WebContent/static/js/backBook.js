
$(function () {
	

	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});


function backBook(id){
	var postdata = "borrowId="+id;
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/backManageAction_backBook.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						showInfo("还书成功");	

	                }else if(data == -1){
						showInfo("该书已经还了");
					}else if(data == 2){
						showInfo("还书成功,请缴纳逾期罚金");
					}else{
						showInfo("还书失败");
					}
								
				}
			}
			   
    	);
			
		
	
}







function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


