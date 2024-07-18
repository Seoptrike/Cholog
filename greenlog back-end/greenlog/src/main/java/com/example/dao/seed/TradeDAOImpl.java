package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.TradeVO;

@Repository
public class TradeDAOImpl implements TradeDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.TradeMapper";

	@Override
	public void insert(TradeVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<HashMap<String, Object>> userList(String seed_number, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("seed_number", seed_number);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("key", vo.getKey());
		map.put("word", vo.getWord());
		return session.selectList(namespace + ".userList", map);
	}

	@Override
	public int userListCount(String seed_number, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("seed_number", seed_number);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("key", vo.getKey());
		map.put("word", vo.getWord());
		return session.selectOne(namespace + ".userListCount", map);
	}

}
