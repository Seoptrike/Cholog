package com.example.domain;

public class TestVO {
	private int tid;
	private String user;

	public int getTid() {
		return tid;
	}

	public void setTid(int tid) {
		this.tid = tid;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "TestVO [tid=" + tid + ", user=" + user + "]";
	}

}
