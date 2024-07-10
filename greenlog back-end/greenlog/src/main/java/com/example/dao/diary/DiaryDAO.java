package com.example.dao.diary;

import java.util.HashMap;

import com.example.domain.DiaryVO;

public interface DiaryDAO {
	public void insert(DiaryVO vo);
	public HashMap<String, Object> read(int key);
	public void update(DiaryVO vo);
}
