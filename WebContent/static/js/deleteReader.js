


function deleteReader(id){
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/readerManageAction_deleteReader.action',
				params: "readerId=" + id,
	    		callback:function(data) {
					if (data == 1) {
						showInfo("删除成功");
					}else if(data == -1){
						showInfo("该读者有未还书记录,不能删除");
					}else if(data==-2){
						showInfo("该读者有未缴纳的罚款,不能删除");
					}else{
						showInfo("删除失败");
					}
								
				}
			}
			   
    	);
			

}

$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
 });



function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


