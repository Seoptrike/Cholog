package com.example.dao.reply;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.ReplyVO;

@Repository
public class ReplyDAOImpl implements ReplyDAO {

		@Autowired
		SqlSession session;
		String namespace="com.example.mapper.ReplyMapper";

		@Override
		public List<HashMap<String, Object>> replyList() {
				return session.selectList(namespace + ".replyList");
		}
		
		@Override
		public void insert(ReplyVO vo) {
				session.insert(namespace + ".insert" , vo);
		}

}
