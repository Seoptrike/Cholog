package com.example.dao.review;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.ReviewVO;

@Repository
public class ReviewDAOImpl implements ReviewDAO {

		@Autowired
		SqlSession session;
		String namespace="com.example.mapper.ReviewMapper";
	
		@Override
		public void insert(ReviewVO vo) {
				session.insert(namespace + ".insert", vo);			
		}

		@Override
		public List<HashMap<String, Object>> reviewList(QueryVO vo) {
				return session.selectList(namespace + ".reviewList", vo);
		}

		@Override
		public void delete(int review_key) {
				session.delete(namespace + ".delete", review_key);
		}

		@Override
		public void update(ReviewVO vo) {
				session.update(namespace + ".update", vo);
		}

		@Override
		public void updateLock(ReviewVO vo) {
				session.update(namespace + ".updateLock", vo);
		}
		
		

}
