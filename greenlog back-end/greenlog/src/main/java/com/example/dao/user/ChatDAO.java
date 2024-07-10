package com.example.dao.user;

import java.util.List;

import com.example.domain.ChatVO;

public interface ChatDAO {
	public void insertChat(ChatVO chatVO);

	public List<ChatVO> list();

	public void update(ChatVO chatVO);

	public List<ChatVO> alist();

	public void save(ChatVO chatVO);
}
