package com.example.dao.reply;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.ReplyVO;

public interface ReplyDAO {
	
	public void insert (ReplyVO vo);
	public List <HashMap<String, Object>> replyList(int reply_bbs_key, QueryVO vo);
	public void delete(int reply_key);
	public void update(ReplyVO vo);
	public void updateLock(ReplyVO vo);
	public int total(int reply_bbs_key);

}
