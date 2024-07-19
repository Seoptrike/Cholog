package com.example.dao.bbs;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.BBSPhotoVO;
import com.example.domain.BBSVO;
import com.example.domain.QueryVO;

@Repository
public class BBSDAOImpl implements BBSDAO {

    @Autowired
    SqlSession session;

    private static final String NAMESPACE = "com.example.mapper.BBSMapper";

    @Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(NAMESPACE + ".list", vo);
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

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(NAMESPACE + ".total", vo);
	}

	@Override
	public void updateViewcnt(int bbs_key) {
		session.update(NAMESPACE+".updateViewcnt",bbs_key);
		
	}
	 @Override
	    public List<BBSVO> topList() {
	        return session.selectList(NAMESPACE + ".topList"); // 추가
	    }

	@Override
	public void photoInsert(BBSPhotoVO vo) {
		session.insert(NAMESPACE + ".photoInsert", vo);
		
	}

	@Override
	public void photoDelete(int bbsPhoto_key) {
		session.delete(NAMESPACE + ".photoDelete", bbsPhoto_key);		
	}

	@Override
	public void updatePhoto(BBSPhotoVO vo) {
		session.update(NAMESPACE + ".updatePhoto", vo);
	}

	@Override
	public List<HashMap<String, Object>> photoSelect(int bbsphoto_bbs_key) {
		return session.selectList(NAMESPACE + ".photoSelect", bbsphoto_bbs_key);
	}

	
}
