package com.rain.servlet;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.rain.bean.BookBean;
import com.rain.dao.BookDao;

/**
 * Servlet implementation class selectServlet
 */
@WebServlet("/selectServlet")
public class selectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public selectServlet() {
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
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		//因为在管理员界面和读者界面都有查找功能，为了将查找的结果返回正确的页面，设置了tip，tip=1表示管理员界面
		int tip = Integer.parseInt(request.getParameter("tip"));
		String name = request.getParameter("name");
		BookDao bookdao = new BookDao();
		ArrayList<BookBean> data = bookdao.getLikeList(name);
		//将获取的结果存入请求中
		request.setAttribute("data", data);
		String url = "";
		//转发不同的界面
		if(tip==1){
			url = response.encodeURL("admin_book.jsp");
		}else{
			url = response.encodeURL("select.jsp");
		}
		//将请求转发
	    request.getRequestDispatcher(url).forward(request, response);
	}

}
