package com.example.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AnswersVO {
	private int answers_key;
    private int QA_key;
    private String answers_answer;
    private String content;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private String answer_regDate;
    
	public int getAnswers_key() {
		return answers_key;
	}
	public void setAnswers_key(int answers_key) {
		this.answers_key = answers_key;
	}
	public int getQA_key() {
		return QA_key;
	}
	public void setQA_key(int qA_key) {
		QA_key = qA_key;
	}
	public String getAnswers_answer() {
		return answers_answer;
	}
	public void setAnswers_answer(String answers_answer) {
		this.answers_answer = answers_answer;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAnswer_regDate() {
		return answer_regDate;
	}
	public void setAnswer_regDate(String answer_regDate) {
		this.answer_regDate = answer_regDate;
	}
	
	@Override
	public String toString() {
		return "AnswersVO [answers_key=" + answers_key + ", QA_key=" + QA_key + ", answers_answer=" + answers_answer
				+ ", content=" + content + ", answer_regDate=" + answer_regDate + "]";
	}
}
