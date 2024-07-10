package com.example.service.chat;

import java.util.List;

import com.example.domain.ChatVO;

public interface ChatService {

	public void saveChat(ChatVO chatVO);

	List<ChatVO> getAllChatsAfterSaving(ChatVO chatVO);

	List<ChatVO> getAllChats();
}
