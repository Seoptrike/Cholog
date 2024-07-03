package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.SeedVO;

@Repository
public class SeedDAOImpl implements SeedDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.SeedMapper";

	@Override
	public List<HashMap<String, Object>> list(SeedVO vo) {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".list", vo);
	}

}
