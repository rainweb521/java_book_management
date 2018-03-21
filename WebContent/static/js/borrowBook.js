
$(function () {
	

    $('#btn_borrow').click(function () {

	var postdata = "paperNO="+$.trim($("#borrowReaderPaperNO").val())+"&ISBN="+$.trim($("#borrowBookISBN").val())+"&pwd="+ $.trim($("#pwd").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/borrowManageAction_borrowBook.action',
				params: postdata,
	    		callback:function(data) {
					if (data==1) {
						showInfo("借阅成功");	

	                }else if (data==-1) {
						showInfo("密码错误");	
					}else if(data==-2){
						showInfo("借阅数量已达上限");

					}else if(data==-3){
						showInfo("请先缴纳未缴纳的罚金");
					}else if(data==-4){
						showInfo("该图书为馆内最后一本,无法借阅");
					}else if(data==2){
						showInfo("读者证件号有误,请重试");
					}else if(data==3){
						showInfo("图书ISBN号码有误,请重试");
					}else{
						showInfo("借阅失败");
					}			
				}
			}
			   
    	);
			
		
	});
	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
	
       		 location.reload();  	//刷新当前页面
    	});
	
	

});










function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


