package com.example.dao.report;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.ReportVO;

@Repository
public class ReportDAOImpl implements ReportDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.ReportMapper";

	@Override
	public void insert(ReportVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public int count() {
		return session.selectOne(namespace + ".count");
	}

}
