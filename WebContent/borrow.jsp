<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import = "com.rain.bean.AdminBean,com.rain.bean.HistoryBean,com.rain.dao.BookDao,com.rain.dao.AdminDao" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN" class="ax-vertical-centered">
<head>
	<meta charset="UTF-8">
	<title>图书馆管理系统</title>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="static/css/bootstrap.min.css">
	    <link rel="stylesheet" href="static/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="static/css/bootstrap-admin-theme.css">
        <link rel="stylesheet" href="static/css/bootstrap-admin-theme.css">
        <script src="static/js/bootstrap.min.js"></script>
        <script src="static/jQuery/jquery-3.1.1.min.js"></script>
            <script src="static/js/bootstrap-dropdown.min.js"></script>
              <script src="static/js/reader.js"></script>
              
             <script src="ajax-lib/ajaxutils.js"></script>
            <script src="static/js/readerUpdateInfo.js"></script>
             <script src="static/js/readerUpdatePwd.js"></script>

</head>



<script src="static/js/jquery.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>


<body class="bootstrap-admin-with-small-navbar">
<%
AdminBean admin = new AdminBean();
String aid = (String)session.getAttribute("aid");
AdminDao admindao = new AdminDao();
admin = admindao.get_AidInfo2(aid);

%>
<nav class="navbar navbar-inverse navbar-fixed-top bootstrap-admin-navbar bootstrap-admin-navbar-under-small" role="navigation">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="collapse navbar-collapse main-navbar-collapse">
                    <a class="navbar-brand" href="/reader.jsp"><strong>欢迎使用图书馆管理系统</strong></a>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                           <a href="#" role="button" class="dropdown-toggle" data-hover="dropdown"> <i class="glyphicon glyphicon-user"></i> 欢迎您: 
                                <span><% out.write(admin.getName());%></span>  <i class="caret"></i></a>
                                 <ul class="dropdown-menu">
                                <li><a href="#updateinfo" data-toggle="modal">个人资料</a></li>
                                 <li role="presentation" class="divider"></li>
                                <li><a href="#updatepwd" data-toggle="modal">修改密码</a></li>
                                <li role="presentation" class="divider"></li>
                                <li><a href="/books/login.jsp">退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>

<div class="container">
    <!-- left, vertical navbar & content -->
    <div class="row">
        <!-- left, vertical navbar -->
        <div class="col-md-2 bootstrap-admin-col-left">
            <ul class="nav navbar-collapse collapse bootstrap-admin-navbar-side">
               <li>
                    <a href="/books/select.jsp"><i class="glyphicon glyphicon-chevron-right"></i> 图书查询</a>
                </li>
	            <li>
	                 <a href="/books/borrow.jsp"><i class="glyphicon glyphicon-chevron-right"></i> 借阅信息</a>
	                </li>
	                <li>
	                    <a href="/books/history.jsp"><i class="glyphicon glyphicon-chevron-right"></i> 借阅历史</a>
	                </li>
                
            </ul>
        </div>

        <!-- content -->
        <div class="col-md-10">
           <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default bootstrap-admin-no-table-panel">
                            <div class="panel-heading">
                                <div class="text-muted bootstrap-admin-box-title">当前借阅信息</div>
                            </div>
                           
                        </div>
                    </div>
                </div>
    <div class="row">
                <div class="col-lg-12">
                  
                </div>
            </div>
                <div class="row">
                    <div class="col-lg-12">
                        <table id="data_list" class="table table-hover table-bordered" cellspacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>图书号</th>
	                            <th>图书名称</th>
	                            <th>读者账号</th>
	                            <th>读者名称</th>
	                            <th>借阅日期</th>
	                            <th>截止还书日期</th>
	                            <th>操作</th>
                            </tr>
                            </thead>
                            <%
                             ArrayList<HistoryBean> bookdata = new ArrayList<HistoryBean>();
                             bookdata = (ArrayList<HistoryBean>)request.getAttribute("data");
                           if(bookdata==null){
                        	   BookDao bookdao = new BookDao();
                        	   bookdata = (ArrayList<HistoryBean>)bookdao.get_HistoryListInfo(1,aid);
                           }
  for (HistoryBean bean : bookdata){
  %>                 
                            	<tbody>
	                         	   	<td><%= bean.getCard() %></td>
	                         	   	<td><%= bean.getBookname() %></td>
	                                <td><%= bean.getAdminname() %></td>
	                                <td><%= bean.getUsername() %></td>
	                                <td><%= bean.getBegintime() %></td>
	                                <td><%= bean.getEndtime() %></td>  
	                                <td>
<button type="button" class="btn btn-info btn-xs" data-toggle="modal" onclick="haibook(<%= bean.getHid() %>)">还书</button>
	                                </td>                                               
                          	  </tbody>
                             <%} %> 
                        </table>
                    </div>
                </div>
            <script type="text/javascript">
    function haibook(hid) {
    	con=confirm("是否还书?"); 
    	if(con==true){
    		location.href = "/books/borrowServlet?tip=2&show=1&hid="+hid;
    	}
    }
    </script>
        </div>
    </div>
</div>



<!--------------------------------------查看的模糊框------------------------>  
                                 <form class="form-horizontal">   <!--保证样式水平不混乱-->   
                                        <!-- 模态框（Modal） -->
									<div class="modal fade" id="findBackModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
														&times;
													</button>
													<h4 class="modal-title" id="myModalLabel">
														查看归还信息
													</h4>
												</div>
												<div class="modal-body">
												
										<!---------------------表单-------------------->
										 <div class="form-group">
											<label for="firstname" class="col-sm-3 control-label">借阅编号</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="borrowId"  readonly="readonly">
												
												</div>
										</div>
											
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">借阅书籍ISBN号</label>
											<div class="col-sm-7">
												<input type="text" class="form-control" id="ISBN"  readonly="readonly">

											</div>
										</div>
											
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">借阅书籍名称</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="bookName"  readonly="readonly">
												
												</div>
										</div>
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">借阅书籍类型</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="bookType"  readonly="readonly">
												
												</div>
										</div>
										
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">读者证件号</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="paperNO"  readonly="readonly">
										
												</div>
										</div>
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">读者名称</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="readerName"  readonly="readonly">
										
												</div>
										</div>
										
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">读者类型</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="readerType"  readonly="readonly">
										
												</div>
										</div>
										
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">逾期天数</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="overday"  readonly="readonly">
										
												</div>
										</div>
										
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">操作管理员</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="admin"  readonly="readonly">
										
												</div>
										</div>
										
										
										<div class="form-group">	
											<label for="firstname" class="col-sm-3 control-label">归还状态</label>
												<div class="col-sm-7">
													<input type="text" class="form-control" id="state"  readonly="readonly">
										
												</div>
										</div>
										
										
										<!---------------------表单-------------------->
									</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-default" data-dismiss="modal">关闭
													</button>
												</div>
											</div><!-- /.modal-content -->
										</div><!-- /.modal -->
									</div>

                                 </form>	
 								<!--------------------------------------查看的模糊框------------------------>  
 
 
 

 

    
<!-------------------------------------------------------------->  
                 
                   <form class="form-horizontal" method="post" action="/books/AdminServlet">   <!--保证样式水平不混乱-->                  
                                     <!-- 模态框（Modal） -->
				<div class="modal fade" id="updatepwd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
									&times;
								</button>
								<h4 class="modal-title" id="myModalLabel">
									修改密码
								</h4>
							</div>
							<div class="modal-body">
							 
								<!--正文-->
								<input type="hidden" name="tip" value="1">
								<input type="hidden" name="url" value="borrow">
							<div class="form-group">
								<label for="firstname" class="col-sm-3 control-label">原密码</label>
								<div class="col-sm-7">
									<input type="password" class="form-control" name="password" id="oldPwd"  placeholder="请输入原密码">
										<label class="control-label" for="oldPwd" style="display: none"></label>				
								</div>
							</div>	
							
							<div class="form-group">
								<label for="firstname" class="col-sm-3 control-label">新密码</label>
								<div class="col-sm-7">
									<input type="password" class="form-control" name="password2" id="newPwd"  placeholder="请输入新密码">
										<label class="control-label" for="newPwd" style="display: none"></label>			
								</div>
							</div>	
							
								<!--正文-->
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">关闭
								</button>
								<button type="submit" class="btn btn-primary" >
									修改
								</button>
							</div>
						</div><!-- /.modal-content -->
					</div><!-- /.modal -->
				</div>

				</form>	
                                   <!-------------------------------------------------------------->
                                   
                                   <!-------------------------个人资料模糊框------------------------------------->  
                 
                   <form class="form-horizontal" method="post" action="/books/AdminServlet">   <!--保证样式水平不混乱-->                  
                                     <!-- 模态框（Modal） -->
				<div class="modal fade" id="updateinfo" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
									&times;
								</button>
								<h4 class="modal-title" id="ModalLabel">
									个人资料
								</h4>
							</div>
							
							<div class="modal-body">
							 
								<!--正文-->
								<input type="hidden" name="tip" value="2">
								<input type="hidden" name="url" value="borrow">
							<div class="form-group">
								<label for="firstname" class="col-sm-3 control-label">真实姓名</label>
								<div class="col-sm-7">
			<input type="text" class="form-control" id="name" name="name" placeholder="请输入您的真实姓名" value='<% out.write(admin.getName());%>'>
										<label class="control-label" for="name" style="display: none"></label>			
								</div>
							</div>	
							
							<div class="form-group">
								<label for="firstname" class="col-sm-3 control-label">手机号</label>
								<div class="col-sm-7">
			<input type="text" class="form-control" id="phone" name="phone" placeholder="请输入您的手机号" value='<% out.write(admin.getPhone());%>'>
											<label class="control-label" for="phone" style="display: none"></label>				
								</div>
							</div>	
							
							
							<div class="form-group">
								<label for="firstname" class="col-sm-3 control-label">邮箱</label>
								<div class="col-sm-7">
			<input type="text" class="form-control" id="email" name="email"  placeholder="请输入您的邮箱" value='<% out.write(admin.getEmail());%>'>
											<label class="control-label" for="email" style="display: none"></label>				
								</div>
							</div>	
							
								<!--正文-->
								
								
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">关闭
								</button>
								<button type="submit" class="btn btn-primary" >
									修改
								</button>
							</div>
						</div><!-- /.modal-content -->
					</div><!-- /.modal -->
				</div>

				</form>	
                                   <!-------------------------------------------------------------->
    
    
    
    

    <div class="modal fade" id="modal_info" tabindex="-1" role="dialog" aria-labelledby="addModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="infoModalLabel">提示</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12" id="div_info"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="btn_info_close" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>



</body>
</html>