package com.example.dao.mall;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.MallVO;
import com.example.domain.QueryVO;

@Repository
public class MallDAOImpl implements MallDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.MallMapper";
	
	
	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}


	@Override
	public void insertInfo(MallVO vo) {
		session.insert(namespace+".insertInfo",vo);
	}


	@Override
	public MallVO read(int mall_key) {
		return session.selectOne(namespace+".read", mall_key);
	}
	
	@Override
	public void update(MallVO vo) {
		session.update(namespace+".update", vo);
	}


	@Override
	public void delete(int mall_key) {
		session.delete(namespace+".delete", mall_key);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace+".total",vo);
	}

	


	


	


//	@Override
//	public void insertPhoto(MallPhotoVO pvo) {
//		session.insert(namespace+".insertPhoto",pvo);
//	}


	

	
	

	

}
