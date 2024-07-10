package com.example.domain;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DiaryVO {
	private int diary_key;
	private String diary_title;
	private String diary_writer;
	private String diary_contents;
	private String diary_photo;
	@JsonFormat(pattern="yyyy년 MM월 dd일 HH:mm:ss", timezone="Asia/Seoul")
	private Date diary_regDate;
	private int diary_like;
	private int diary_state;
	
	public String getDiary_title() {
		return diary_title;
	}
	public void setDiary_title(String diary_title) {
		this.diary_title = diary_title;
	}
	public int getDiary_key() {
		return diary_key;
	}
	public void setDiary_key(int diary_key) {
		this.diary_key = diary_key;
	}
	public String getDiary_writer() {
		return diary_writer;
	}
	public void setDiary_writer(String diary_writer) {
		this.diary_writer = diary_writer;
	}
	public String getDiary_contents() {
		return diary_contents;
	}
	public void setDiary_contents(String diary_contents) {
		this.diary_contents = diary_contents;
	}
	public String getDiary_photo() {
		return diary_photo;
	}
	public void setDiary_photo(String diary_photo) {
		this.diary_photo = diary_photo;
	}
	public Date getDiary_regDate() {
		return diary_regDate;
	}
	public void setDiary_regDate(Date diary_regDate) {
		this.diary_regDate = diary_regDate;
	}
	public int getDiary_like() {
		return diary_like;
	}
	public void setDiary_like(int diary_like) {
		this.diary_like = diary_like;
	}
	public int getDiary_state() {
		return diary_state;
	}
	public void setDiary_state(int diary_state) {
		this.diary_state = diary_state;
	}
	@Override
	public String toString() {
		return "DiaryVO [diary_key=" + diary_key + ", diary_title=" + diary_title + ", diary_writer=" + diary_writer
				+ ", diary_contents=" + diary_contents + ", diary_photo=" + diary_photo + ", diary_regDate="
				+ diary_regDate + ", diary_like=" + diary_like + ", diary_state=" + diary_state + "]";
	}
	
}
