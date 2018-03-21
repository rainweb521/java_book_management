
$(function () {
	

    $('#updateBook').click(function () {

    	
    	if (!validUpdateBook()) {
            return;
        }
    	
	var postdata = "bookId="+$.trim($("#updateBookId").val())+"&bookName="+$.trim($("#updateBookName").val())+"&bookTypeId="+$.trim($("#updateBookType").val())
	+"&autho="+ $.trim($("#updateAutho").val())+"&press="+ $.trim($("#updatePress").val())+"&price="+ $.trim($("#updatePrice").val())
	+"&description="+ $.trim($("#updateDescription").val())+"&ISBN="+ $.trim($("#updateISBN").val());
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/bookManageAction_updateBook.action',
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






function updateBook(id){
		$("#updateBookType option[value!=-1]").remove();//移除先前的选项
		ajax(
					  {
			    		url:"admin/bookManageAction_getAllBookTypes.action",
			    		type:"json",
			    		callback:function(data) {
							// 循环遍历每个图书分类，每个名称生成一个option对象，添加到<select>中
							for(var index in data) {
								var op = document.createElement("option");//创建一个指名名称元素
								op.value = data[index].typeId;//设置op的实际值为当前的图书分类编号
								var textNode = document.createTextNode(data[index].typeName);//创建文本节点
								op.appendChild(textNode);//把文本子节点添加到op元素中，指定其显示值
								
								document.getElementById("updateBookType").appendChild(op);
							}
							
									ajax(
							    		  {
										  	method:'POST',
								    		url:'admin/bookManageAction_getBook.action',
											params: "bookId=" + id,
											type:"json",
								    		callback:function(data) {
												$("#updateBookId").val(data.bookId);
												$("#updateISBN").val(data.ISBN);
												$("#updateBookName").val(data.bookName);
												$("#updateBookType").val(data.bookType.typeId);
												$("#updateAutho").val(data.autho);
												$("#updatePress").val(data.press);
												$("#updatePrice").val(data.price);
												$("#updateDescription").val(data.description);
															
											}
										}
										   
							    	);
						}
			  		 }
				);	
	
	
}



function validUpdateBook() {
    var flag = true;

    var ISBN = $.trim($("#updateISBN").val());
    if (ISBN == "") {
        $('#updateISBN').parent().addClass("has-error");
        $('#updateISBN').next().text("请输入图书ISBN码");
        $("#updateISBN").next().show();
        flag = false;
    } else {
        $('#updateISBN').parent().removeClass("has-error");
        $('#updateISBN').next().text("");
        $("#updateISBN").next().hide();
    }

    var bookName = $.trim($("#updateBookName").val());
    if (bookName == "") {
        $('#updateBookName').parent().addClass("has-error");
        $('#updateBookName').next().text("请输入图书名称");
        $("#updateBookName").next().show();
        flag = false;
    }else {
        $('#updateBookName').parent().removeClass("has-error");
        $('#updateBookName').next().text("");
        $("#updateBookName").next().hide();
    }
	
	
	var bookType = $.trim($("#updateBookType").val());
	if(bookType == -1){
		 $('#updateBookType').parent().addClass("has-error");
        $('#updateBookType').next().text("请选择图书分类");
        $("#updateBookType").next().show();
        flag = false;
	}else {
        $('#updateBookType').parent().removeClass("has-error");
        $('#updateBookType').next().text("");
        $("#updateBookType").next().hide();
    }
	
	var autho = $.trim($("#updateAutho").val());
	if(autho == ""){
		 $('#updateAutho').parent().addClass("has-error");
        $('#updateAutho').next().text("请输入作者名称");
        $("#updateAutho").next().show();
        flag = false;
	}else {
        $('#updateAutho').parent().removeClass("has-error");
        $('#updateAutho').next().text("");
        $("#updateAutho").next().hide();
    } 


	var press = $.trim($("#updatePress").val());
	if(press == ""){
		 $('#updatePress').parent().addClass("has-error");
        $('#updatePress').next().text("请输入出版社名称");
        $("#updatePress").next().show();
        flag = false;
	}else {
        $('#updatePress').parent().removeClass("has-error");
        $('#updatePress').next().text("");
        $("#updatePress").next().hide();
    } 
	
	
	
	var price = $.trim($("#updatePrice").val());
	if(price == ""){
		 $('#updatePrice').parent().addClass("has-error");
        $('#updatePrice').next().text("请输入总数量");
        $("#updatePrice").next().show();
        flag = false;
	}else if(price<=0 || price!=parseInt(price)){
		 $('#updatePrice').parent().addClass("has-error");
        $('#updatePrice').next().text("数量必须为正整数");
        $("#updatePrice").next().show();
        flag = false;
	}else {
        $('#updatePrice').parent().removeClass("has-error");
        $('#updatePrice').next().text("");
        $("#updatePrice").next().hide();
    } 
	
	
	
    return flag;
}



function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


