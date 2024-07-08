package com.example.dao.mall;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.MallPhotoVO;
import com.example.domain.MallVO;
import com.example.domain.QueryVO;

@Repository
public class MallDAOImpl implements MallDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.MallMapper";
	
	
	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".mallList", vo);
	}


	@Override
	public void insert(MallVO vo) {
		session.insert(namespace+".insert",vo);
	}


	@Override
	public void insert(MallPhotoVO pvo) {
		session.insert(namespace+".insertPhoto",pvo);
	}


	
	

	

}
