package com.example.service.chat;

import java.util.HashMap;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.user.ChatDAO;

@Service
public class ChatServiceImpl implements ChatService {
	@Autowired
	ChatDAO cdao;

	@Transactional
	@Override
	public HashMap<String, Object> List() {
		HashMap<String, Object> map = new HashMap<>();
		map.put("doc", cdao.list());
		map.put("total", cdao.listCount());
		return map;
	}

}
