
$(function () {
	

	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});



function getForfeitInfoById(id){
	ajax(
		  {
		  	method:'POST',
    		url:'admin/forfeitManageAction_getForfeitInfoById.action',
			params: "borrowId=" + id,
			type:"json",
    		callback:function(data) {
				
				$("#borrowId").val(data.borrowId);
				$("#ISBN").val(data.borrowInfo.book.ISBN);
				$("#bookName").val(data.borrowInfo.book.bookName);
				$("#bookType").val(data.borrowInfo.book.bookType.typeName);
				$("#paperNO").val(data.borrowInfo.reader.paperNO);
				$("#readerName").val(data.borrowInfo.reader.name);
				$("#readerType").val(data.borrowInfo.reader.readerType.readerTypeName);
				$("#overday").val(data.borrowInfo.overday);
				if (data.isPay == 0) {
					$("#state").val("未缴纳罚款");
				}else{
					$("#state").val("已缴纳罚款");
				}
				
				$("#admin").val(data.admin.name);
			}
		}
										   
							    
						
	);	
	
	
	
	
	
			

}





function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


