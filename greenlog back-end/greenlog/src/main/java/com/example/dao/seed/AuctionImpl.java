package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.AuctionVO;

@Repository
public class AuctionImpl implements AuctionDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.AuctionMapper";

	@Override
	public void insert(AuctionVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<HashMap<String, Object>> userAList(String uid) {
		return session.selectList(namespace + ".userAList", uid);
	}

}
