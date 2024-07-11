package com.example.dao.diary;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
	public DiaryVO read(int key) {
		return session.selectOne(namespace + ".read" , key);
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
	public List<HashMap<String, Object>> personList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("size", vo.getSize());
		map.put("start", vo.getStart());
		map.put("diary_writer", uid);
		return session.selectList(namespace + ".personList", map);
	}

	@Override
	public void delete(int key) {
		session.delete(namespace + ".delete", key);
		
	}

	@Override
	public void likePress(int key, String uid) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("diary_key", key);
		map.put("diary_writer", uid);
		session.insert(namespace + ".likePress", map);
	}
	
	

	
	
}
