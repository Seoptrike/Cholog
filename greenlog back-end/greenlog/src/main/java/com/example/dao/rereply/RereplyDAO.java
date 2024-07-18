package com.example.dao.rereply;

import java.util.HashMap;
import java.util.List;

import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;

public interface RereplyDAO {
	
		public void insert (RereplyVO vo);
		public List <HashMap<String, Object>> rereplyList(int reply_key);
		public void delete(int rereply_key);
		public void update(RereplyVO vo);
		public void updatereLock (RereplyVO vo);
		public int rereplyCount (int reply_key);
		public void rereplyLikeUpdate (RereplyLikeVO vo);
		public void rereactionInsert (RereplyLikeVO vo);
		public int rereplyLikeCount (int rereply_key);
		public int rereplyDisLikeCount (int rereply_key);

}
