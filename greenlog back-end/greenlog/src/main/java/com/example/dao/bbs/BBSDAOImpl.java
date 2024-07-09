package com.example.dao.bbs;

import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.domain.BBSVO;

@Repository
public class BBSDAOImpl implements BBSDAO {

    @Autowired
    private SqlSession session;

    private static final String NAMESPACE = "com.example.mapper.BBSMapper";

    @Override
    public List<HashMap<String, Object>> list() {
        return session.selectList(NAMESPACE + ".list");
    }

    @Override
    public void delete(int bbs_key) {
        session.delete(NAMESPACE + ".delete", bbs_key);
    }


    @Override
    public void insert(BBSVO vo) {
        session.insert(NAMESPACE + ".insert", vo);
    }

	@Override
	public BBSVO read(int bbs_key) {
		return session.selectOne(NAMESPACE+".read",bbs_key);
	}

	@Override
	public void update(BBSVO vo) {
		session.update(NAMESPACE+".update",vo);
		
	}


}
