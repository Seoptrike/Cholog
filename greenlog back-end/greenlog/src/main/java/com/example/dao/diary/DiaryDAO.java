package com.example.dao.diary;

import java.util.HashMap;
import java.util.List;

import com.example.domain.DiaryVO;
import com.example.domain.QueryVO;

public interface DiaryDAO {
	public void insert(DiaryVO vo);
	public DiaryVO read(int key);
	public void update(DiaryVO vo);
	public List<HashMap<String, Object>> personList(String uid, QueryVO vo);
	public int pTotal(String uid);
	public List<HashMap<String, Object>> adminList();
	public void delete(int key);
	public void likePress(int key, String uid);
}
