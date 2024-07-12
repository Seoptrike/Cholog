package com.example.dao.diary;

import java.util.HashMap;
import java.util.List;

import com.example.domain.DiaryLikeVO;
import com.example.domain.DiaryPhotoVO;
import com.example.domain.DiaryVO;
import com.example.domain.QueryVO;

public interface DiaryDAO {
	public void insert(DiaryVO vo);
	public HashMap<String,Object> read(int key, String uid);
	public void update(DiaryVO vo);
	public List<HashMap<String, Object>> personList(String uid, String uid2, QueryVO vo);
	public int pTotal(String uid);
	public List<HashMap<String, Object>> adminList();
	public void delete(int key);
	public void likePress(DiaryLikeVO vo);
	public void likeCancel(DiaryLikeVO vo);
	public void photoInsert(DiaryPhotoVO vo);
	public int lastKey();
	public void thumbnail(int diary_key, String diary_thumbnail);
}
