package com.rain.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import com.rain.bean.AdminBean;
import com.rain.dao.AdminDao;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		doGet(request, response);
		//登录的判断
		PrintWriter out = response.getWriter();
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		//获取账号和密码
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		AdminDao userdao = new AdminDao();
		//对账号和密码进行判断
		boolean result = userdao.Login_verify(username, password);
		HttpSession session = request.getSession();
		//判断输入正确
		if(result){
			AdminBean adminbean = new AdminBean();
			AdminDao admindao = new AdminDao();
			//更加账号和密码查找出读者的信息
			adminbean = admindao.getAdminInfo(username,password);
			//将aid存入session中
			session.setAttribute("aid", ""+adminbean.getAid());
			//设置session的失效时间
			session.setMaxInactiveInterval(6000);
			//根据status的值来判断是管理员，还是读者，status=1为读者
			if(adminbean.getStatus()==1){
				response.sendRedirect("/books/index2.jsp");
			}else{
				response.sendRedirect("/books/admin.jsp");
			}
		}else{
			//没有找到对应的账号和密码，返回重新登录
			session.setAttribute("state", "密码错误");
			response.sendRedirect("/books/login.jsp");
		}
	}

}
