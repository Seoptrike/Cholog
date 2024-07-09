package com.example.dao.reply;

import java.util.HashMap;
import java.util.List;

import com.example.domain.ReplyVO;

public interface ReplyDAO {
	
	public List <HashMap<String, Object>> replyList();
	public void insert (ReplyVO vo);

}
