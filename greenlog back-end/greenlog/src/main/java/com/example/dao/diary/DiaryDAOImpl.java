package com.example.dao.diary;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.DiaryVO;

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
	public HashMap<String, Object> read(int key) {
		return session.selectOne(namespace + ".read" , key);
	}

	@Override
	public void update(DiaryVO vo) {
		session.update(namespace + ".update", vo);
		
	}

	
	
}
