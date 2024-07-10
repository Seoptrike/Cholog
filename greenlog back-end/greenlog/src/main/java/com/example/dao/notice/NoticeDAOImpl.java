package com.example.dao.notice;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.NoticeVO;

@Repository
public class NoticeDAOImpl implements NoticeDAO{
	
	@Autowired
    private SqlSession session;
    private static final String NAMESPACE = "com.example.mapper.NoticeMapper";

	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(NAMESPACE+".list");
	}

	 @Override
	    public void delete(int notice_key) {
	        session.delete(NAMESPACE + ".delete", notice_key);
	    }


	    @Override
	    public void insert(NoticeVO vo) {
	        session.insert(NAMESPACE + ".insert", vo);
	    }

		@Override
		public NoticeVO read(int notice_key) {
			return session.selectOne(NAMESPACE+".read",notice_key);
		}

		@Override
		public void update(NoticeVO vo) {
			session.update(NAMESPACE+".update",vo);
			
		}

	}
