package com.rain.bean;

public class AdminBean {
	/**
	 * 用户的数据表的bean 
	 */
	private int aid;//id
	private int status;//用来判断是管理员还是读者，读者的值为1，管理员为2
	private String username;//账号，
	private String name;//读者的姓名
	private String password;//密码
	private String email;//邮箱
	private String phone;//手机号
	private int lend_num;//可借阅天数
	private int max_num;//最大可借数
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getLend_num() {
		return lend_num;
	}
	public void setLend_num(int lend_num) {
		this.lend_num = lend_num;
	}
	public int getMax_num() {
		return max_num;
	}
	public void setMax_num(int max_num) {
		this.max_num = max_num;
	}
	
}
