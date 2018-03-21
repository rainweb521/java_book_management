
$(function () {
	

	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});


function pay(id){
	var postdata = "borrowId="+id;
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/forfeitManageAction_payForfeit.action',
				params: postdata,
	    		callback:function(data) {
					if(data==-1){
						showInfo("请先去还书,再来缴纳罚款");
					}else if(data==1){
						showInfo("缴纳成功");
					}else if(data==-2){
						showInfo("已缴纳过该罚款");
					}else{
						showInfo("缴纳失败");
					}
								
				}
			}
			   
    	);
			
		
	
}







function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


