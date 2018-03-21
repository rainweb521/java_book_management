
$(function () {
	

  $('#addBook').click(function () {


 	if (!validAddBook()) {
        return;
    }

	var postdata = "bookName="+$.trim($("#addBookName").val())+"&autho="+ $.trim($("#addAutho").val())+"&press="+ $.trim($("#addPress").val())+"&num="+ $.trim($("#addNum").val())+"&price="+ $.trim($("#addPrice").val())+"&description="
	+ $.trim($("#addDescription").val())+"&bookTypeId="+ $.trim($("#addBookType").val())+"&ISBN="+ $.trim($("#addISBN").val());
	
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/bookManageAction_addBook.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#addModal").modal("hide");//关闭模糊框		
						showInfo("添加成功");	

	                }else {
						$("#addModal").modal("hide");//关闭模糊框
						showInfo("添加失败");
					}
								
				}
			}
			   
    	);
			
		
	});



		
   
	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
		
		
		 $('#btn_add').click(function () {
		 	$("#addBookType option[value!=-1]").remove();//移除先前的选项
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
								
								document.getElementById("addBookType").appendChild(op);
							}
						}
			  		 }
				);	
		});
		
		
});



function validAddBook() {
    var flag = true;

    var ISBN = $.trim($("#addISBN").val());
    if (ISBN == "") {
        $('#addISBN').parent().addClass("has-error");
        $('#addISBN').next().text("请输入图书ISBN码");
        $("#addISBN").next().show();
        flag = false;
    } else {
        $('#addISBN').parent().removeClass("has-error");
        $('#addISBN').next().text("");
        $("#addISBN").next().hide();
    }

    var bookName = $.trim($("#addBookName").val());
    if (bookName == "") {
        $('#addBookName').parent().addClass("has-error");
        $('#addBookName').next().text("请输入图书名称");
        $("#addBookName").next().show();
        flag = false;
    }else {
        $('#addBookName').parent().removeClass("has-error");
        $('#addBookName').next().text("");
        $("#addBookName").next().hide();
    }
	
	
	var bookType = $.trim($("#addBookType").val());
	if(bookType == -1){
		 $('#addBookType').parent().addClass("has-error");
        $('#addBookType').next().text("请选择图书分类");
        $("#addBookType").next().show();
        flag = false;
	}else {
        $('#addBookType').parent().removeClass("has-error");
        $('#addBookType').next().text("");
        $("#addBookType").next().hide();
    }
	
	var autho = $.trim($("#addAutho").val());
	if(autho == ""){
		 $('#addAutho').parent().addClass("has-error");
        $('#addAutho').next().text("请输入作者名称");
        $("#addAutho").next().show();
        flag = false;
	}else {
        $('#addAutho').parent().removeClass("has-error");
        $('#addAutho').next().text("");
        $("#addAutho").next().hide();
    } 


	var press = $.trim($("#addPress").val());
	if(press == ""){
		 $('#addPress').parent().addClass("has-error");
        $('#addPress').next().text("请输入出版社名称");
        $("#addPress").next().show();
        flag = false;
	}else {
        $('#addPress').parent().removeClass("has-error");
        $('#addPress').next().text("");
        $("#addPress").next().hide();
    } 
	
	var num = $.trim($("#addNum").val());
	if(num == ""){
		 $('#addNum').parent().addClass("has-error");
        $('#addNum').next().text("请输入总数量");
        $("#addNum").next().show();
        flag = false;
	}else if(num<=0 || num!=parseInt(num)){
		 $('#addNum').parent().addClass("has-error");
        $('#addNum').next().text("数量必须为正整数");
        $("#addNum").next().show();
        flag = false;
	}else {
        $('#addNum').parent().removeClass("has-error");
        $('#addNum').next().text("");
        $("#addNum").next().hide();
    } 
	
	
	var price = $.trim($("#addPrice").val());
	if(price == ""){
		 $('#addPrice').parent().addClass("has-error");
        $('#addPrice').next().text("请输入总数量");
        $("#addPrice").next().show();
        flag = false;
	}else if(price<=0 || price!=parseInt(price)){
		 $('#addPrice').parent().addClass("has-error");
        $('#addPrice').next().text("数量必须为正整数");
        $("#addPrice").next().show();
        flag = false;
	}else {
        $('#addPrice').parent().removeClass("has-error");
        $('#addPrice').next().text("");
        $("#addPrice").next().hide();
    } 
	
	
	
    return flag;
}




function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


