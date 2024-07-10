package com.example.service.chat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.user.ChatDAO;
import com.example.domain.ChatVO;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	ChatDAO cdao;

	@Override
	@Transactional
	public void saveChat(ChatVO chatVO) {
		cdao.insertChat(chatVO);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ChatVO> getAllChats() {
		return cdao.selectAllChats();
	}

	@Override
	@Transactional(readOnly = true)
	public List<ChatVO> getAllChatsAfterSaving(ChatVO chatVO) {
		saveChat(chatVO); // 채팅 저장
		return getAllChats(); // 저장 후 모든 채팅 목록 반환
	}
}
