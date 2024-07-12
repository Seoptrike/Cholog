package com.example.dao.diary;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.DiaryLikeVO;
import com.example.domain.DiaryPhotoVO;
import com.example.domain.DiaryVO;
import com.example.domain.QueryVO;

@Repository
public class DiaryDAOImpl implements DiaryDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.DiaryMapper";
	
	@Override
	public void insert(DiaryVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public HashMap<String, Object>read(int key, String uid) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("diary_key", key);
		map.put("user_uid", uid);
		return session.selectOne(namespace + ".read" , map);
	}
	

	@Override
	public void update(DiaryVO vo) {
		session.update(namespace + ".update", vo);
		
	}

	@Override
	public List<HashMap<String, Object>> adminList() {
		return session.selectList(namespace + ".adminList");
	}

	@Override
	public int pTotal(String uid) {
		return session.selectOne(namespace + ".personTotal", uid);
	}

	@Override
	public List<HashMap<String, Object>> personList(String uid1, String uid2, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("size", vo.getSize());
		map.put("start", vo.getStart());
		map.put("diary_writer", uid1);
		map.put("user_uid", uid2);
		return session.selectList(namespace + ".personList", map);
	}

	@Override
	public void delete(int key) {
		session.delete(namespace + ".delete", key);
		
	}

	@Override
	public void likePress(DiaryLikeVO vo) {
		session.insert(namespace + ".likePress", vo);
		
	}

	@Override
	public void likeCancel(DiaryLikeVO vo) {
		session.delete(namespace + ".likeCancel", vo);
		
	}

	@Override
	public void photoInsert(DiaryPhotoVO vo) {
		session.insert(namespace + ".photoInsert", vo);
		
	}

	@Override
	public int lastKey() {
		return session.selectOne(namespace +".lastKey");
	}

	@Override
	public void thumbnail(int diary_key, String diary_thumbnail) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("diary_key", diary_key);
		map.put("diary_thumbnail", diary_thumbnail);
		session.insert(namespace + ".thumbnail", map);
		
	}

	


	
	
	

	
	
}
