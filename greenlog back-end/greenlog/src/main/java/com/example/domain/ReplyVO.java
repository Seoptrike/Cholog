package com.example.domain;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ReplyVO {

	private int reply_key;
	private int reply_bbs_key;
	private String reply_writer;
	private String reply_contents;
	@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
	private Date reply_regdate;
	@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
	private Date reply_udate;
	private int reply_like;
	private int reply_hate;
	
	public int getReply_key() {
		return reply_key;
	}
	public void setReply_key(int reply_key) {
		this.reply_key = reply_key;
	}
	public int getReply_bbs_key() {
		return reply_bbs_key;
	}
	public void setReply_bbs_key(int reply_bbs_key) {
		this.reply_bbs_key = reply_bbs_key;
	}
	public String getReply_writer() {
		return reply_writer;
	}
	public void setReply_writer(String reply_writer) {
		this.reply_writer = reply_writer;
	}
	public String getReply_contents() {
		return reply_contents;
	}
	public void setReply_contents(String reply_contents) {
		this.reply_contents = reply_contents;
	}
	public Date getReply_regdate() {
		return reply_regdate;
	}
	public void setReply_regdate(Date reply_regdate) {
		this.reply_regdate = reply_regdate;
	}
	public Date getReply_udate() {
		return reply_udate;
	}
	public void setReply_udate(Date reply_udate) {
		this.reply_udate = reply_udate;
	}
	public int getReply_like() {
		return reply_like;
	}
	public void setReply_like(int reply_like) {
		this.reply_like = reply_like;
	}
	public int getReply_hate() {
		return reply_hate;
	}
	public void setReply_hate(int reply_hate) {
		this.reply_hate = reply_hate;
	}
	
	@Override
	public String toString() {
		return "ReplyVO [reply_key=" + reply_key + ", reply_bbs_key=" + reply_bbs_key + ", reply_writer=" + reply_writer
				+ ", reply_contents=" + reply_contents + ", reply_regdate=" + reply_regdate + ", reply_udate="
				+ reply_udate + ", reply_like=" + reply_like + ", reply_hate=" + reply_hate + "]";
	}
	
}
