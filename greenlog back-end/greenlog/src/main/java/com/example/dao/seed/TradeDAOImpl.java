package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
	public List<HashMap<String, Object>> userList(String seed_number) {
		return session.selectList(namespace + ".userList", seed_number);
	}

}
