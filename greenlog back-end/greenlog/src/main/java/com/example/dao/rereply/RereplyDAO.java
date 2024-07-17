package com.example.dao.rereply;

import java.util.HashMap;
import java.util.List;

import com.example.domain.ReplyLikeVO;
import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;

public interface RereplyDAO {
	
		public void insert (RereplyVO vo);
		public List <HashMap<String, Object>> rereplyList(int reply_key);
		public void delete(int rereply_key);
		public void update(RereplyVO vo);
		public int total (int reply_key);
		public void updatereLock (RereplyVO vo);
		public void updaterereplyLike (RereplyLikeVO vo);
}
