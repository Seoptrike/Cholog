package com.example.dao.qa;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QaVO;

@Repository
public class QADAOImpl implements QADAO{
	
	@Autowired
    private SqlSession session;
    private static final String NAMESPACE = "com.example.mapper.QAMapper";

    @Override
    public List<HashMap<String, Object>> list() {
        return session.selectList(NAMESPACE + ".list");
    }

    @Override
    public void delete(int qa_key) {
        session.delete(NAMESPACE + ".delete", qa_key);
    }


    @Override
    public void insert(QaVO vo) {
        session.insert(NAMESPACE + ".insert", vo);
    }

	@Override
	public QaVO read(int qa_key) {
		return session.selectOne(NAMESPACE+".read",qa_key);
	}

	@Override
	public void update(QaVO vo) {
		session.update(NAMESPACE+".update",vo);
		
	}

}
