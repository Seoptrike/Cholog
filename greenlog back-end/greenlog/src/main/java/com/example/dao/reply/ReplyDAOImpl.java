package com.example.dao.reply;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.ReplyLikeVO;
import com.example.domain.ReplyVO;

@Repository
public class ReplyDAOImpl implements ReplyDAO {

		@Autowired
		SqlSession session;
		String namespace="com.example.mapper.ReplyMapper";
		
		@Override
		public void insert(ReplyVO vo) {
				session.insert(namespace + ".insert" , vo);
		}

		@Override
		public void delete(int reply_key) {
				session.delete(namespace + ".delete", reply_key);
			
		}

		@Override
		public void update(ReplyVO vo) {
				session.update(namespace + ".update", vo);
			
		}
		
		@Override
		public List<HashMap<String, Object>> replyList(int reply_bbs_key, QueryVO vo) {
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("reply_bbs_key", reply_bbs_key);
				map.put("start", vo.getStart());
				map.put("size", vo.getSize());
				map.put("key", vo.getKey());
				return session.selectList(namespace + ".replyList", map);
		}

		@Override
		public int total(int reply_bbs_key) {
			return session.selectOne(namespace + ".total", reply_bbs_key);
		}

		@Override
		public void updateLock(ReplyVO vo) {
				session.update(namespace + ".updateLock", vo);
			
		}

		@Override
		public void replyLikeUpdate(ReplyLikeVO vo) {
				session.update(namespace + ".replyLikeUpdate", vo);
			
		}

		@Override
		public void reactionInsert(ReplyLikeVO vo) {
				session.insert(namespace + ".reactionInsert", vo);
			
		}
		
		@Override
		public int replyLikeCount(int reply_key) {
				return session.selectOne(namespace + ".replyLikeCount", reply_key);
		}

		@Override
		public int replyDisLikeCount(int reply_key) {
			return session.selectOne(namespace + ".replyDisLikeCount", reply_key);
		}
}
