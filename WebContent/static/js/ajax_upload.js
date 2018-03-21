$(document).ready(function(){
    //解决file的change事件只能执行一次的问题
    $(document).on('change','#upload',function(){
        ajaxFileUpload();
    });
});
//上传图片的方法，
function ajaxFileUpload(){
    //获得basePath
    basePath=$('#basePath').val();
    //调用ajaxfileupload.js中的方法
    $.ajaxFileUpload({
        url:'admin/fileUploadAction_fileUpload.action',//上传要提交到的action
        secureuri:false,//是否用安全提交，默认为false
        fileElementId:'upload',//file选择文件的框的id
        dataType:'json',//数据返回格式，如果用json，需要修改ajaxfileupload.js中的内容 eval("data = " + data ); -->data = jQuery.parseJSON(jQuery(data).text());
        success: function (data){
        	if(data.state=="success"){
        		$("#excel").val(data.path);
        	}else{
        		showInfo("上传的格式有误!!");
        	}
        }
    });
}



function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}
