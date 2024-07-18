package com.example.dao.rereply;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;

@Repository
public class RereplyDAOImpl implements RereplyDAO{
	
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.RereplyMapper";

	@Override
	public void insert(RereplyVO vo) {
			session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<HashMap<String, Object>> rereplyList(int reply_key) {
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("reply_key", reply_key);
			return session.selectList(namespace + ".rereplyList", map);
	}

	@Override
	public void delete(int rereply_key) {
			session.delete(namespace + ".delete", rereply_key);
	}

	@Override
	public void update(RereplyVO vo) {
			session.update(namespace + ".update", vo);
	}

	@Override
	public void updatereLock(RereplyVO vo) {
		session.update(namespace + ".updatereLock", vo);
		
	}
	
	@Override
	public int rereplyCount(int reply_key) {
			return session.selectOne(namespace + ".rereplyCount", reply_key);
	}

	@Override
	public void rereplyLikeUpdate(RereplyLikeVO vo) {
			session.update(namespace + ".rereplyLikeUpdate", vo);
		
	}

	@Override
	public void rereactionInsert(RereplyLikeVO vo) {
			session.insert(namespace + ".rereactionInsert", vo);
		
	}

	@Override
	public int rereplyLikeCount(int rereply_key) {
			return session.selectOne(namespace + ".rereplyLikeCount", rereply_key);
	}

	@Override
	public int rereplyDisLikeCount(int rereply_key) {
			return session.selectOne(namespace + ".rereplyDisLikeCount", rereply_key);
	}

}
