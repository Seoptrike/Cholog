package com.example.service.reply;

import java.util.HashMap;

import com.example.domain.QueryVO;

public interface ReplyService {
		public HashMap<String, Object> plist(int reply_bbs_key, QueryVO vo);

}
