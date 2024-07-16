package com.example.dao.answers;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.AnswersVO;
import com.example.domain.QueryVO;

@Repository
public class AnswersDAOImpl implements AnswersDAO{
	
	 @Autowired
	 SqlSession session;

	private static final String NAMESPACE = "com.example.mapper.AnswersMapper";

	  @Override
	  public List<HashMap<String, Object>> list(int QA_key) {
	        return session.selectList(NAMESPACE + ".list", QA_key);
	 }
	
	@Override
	public void insert(AnswersVO vo) {
		session.insert(NAMESPACE+".insert",vo);
	}

	@Override
	public void update(AnswersVO vo) {
		session.update(NAMESPACE+".update",vo);
	}

	@Override
	public void delete(int answers_key) {
		session.delete(NAMESPACE + ".delete", answers_key);
	}

	@Override
	public AnswersVO read(int answers_key) {
		return session.selectOne(NAMESPACE+".read",answers_key);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(NAMESPACE + ".total", vo);
	}
}
