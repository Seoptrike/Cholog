package com.example.controller.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.user.ChatDAO;
import com.example.domain.ChatVO;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ChatController {
	@Autowired
	ChatDAO cdao;

	@Autowired
	SimpMessagingTemplate messagingTemplate;

	// 채팅방열림
	@PostMapping("/chat/insert")
	public void insertChat(@RequestBody ChatVO vo) {
		cdao.insertChat(vo);
	}

	// 채팅방 해결
	@PostMapping("/chat/delete")
	public void update() {
		cdao.update();
	}

	// 채팅방 목록
	@GetMapping("/chat/list")
	public List<ChatVO> list() {
		return cdao.list();
	}

	@MessageMapping("/chat.sendMessage")
	public void sendMessage(ChatVO chatMessage) {
		String uid = chatMessage.getChat_sender();
		String destination = "/topic/" + uid;
		messagingTemplate.convertAndSend(destination, chatMessage);
	}

	@MessageMapping("/chat.addUser")
	@SendTo("/topic/{uid}")
	public void addUser(ChatVO chatMessage) {
		String uid = chatMessage.getChat_sender();
		String destination = "/topic/" + uid;
		messagingTemplate.convertAndSend(destination, chatMessage);
	}
}