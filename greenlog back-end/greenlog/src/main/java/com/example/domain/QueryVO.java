package com.example.domain;

public class QueryVO {
	private int page;
	private int size;
	private int start;
	private String key;
	private String word;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getStart() {
		return (page - 1) * size;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getWord() {
		return "%" + word + "%";
	}

	public void setWord(String word) {
		this.word = word;
	}

	@Override
	public String toString() {
		return "QueryVO [page=" + page + ", size=" + size + ", start=" + start + ", key=" + key + ", word=" + word
				+ "]";
	}

}
