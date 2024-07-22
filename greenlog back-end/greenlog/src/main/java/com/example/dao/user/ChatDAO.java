package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import com.example.domain.ChatVO;
import com.example.domain.ChatlogVO;

public interface ChatDAO {
	public void insertChat(ChatVO chatVO);

	public List<ChatVO> list();

	public void update(ChatVO chatVO);

	public List<ChatVO> alist();

	public void save(ChatVO chatVO);

	public void insertChatlog(ChatlogVO vo);

	public List<HashMap<String, Object>> listchatLog(int Chat_key);

	public int searchChatkey(String uid);

	public int listCount();

}
