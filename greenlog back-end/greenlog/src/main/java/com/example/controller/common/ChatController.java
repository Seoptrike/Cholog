package com.example.controller.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
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
	public void update(@RequestBody ChatVO vo) {
		cdao.update(vo);
	}

	// 채팅방 목록
	@GetMapping("/chat/list")
	public List<ChatVO> list() {
		return cdao.list();
	}

	// 완료된 채팅방 목록
	@GetMapping("/chat/alist")
	public List<ChatVO> alist() {
		return cdao.alist();
	}

	@MessageMapping("/chat.sendMessage")
	public void sendMessage(ChatVO chatMessage) {
		String path = chatMessage.getChat_path();
		String destination = "/topic/" + path;
		cdao.save(chatMessage);
		System.out.println("Sending message to " + destination + ": " + chatMessage);
		messagingTemplate.convertAndSend(destination, chatMessage);
	}

	@MessageMapping("/chat.addUser")
	public void addUser(ChatVO chatMessage) {
		String path = chatMessage.getChat_path();
		String destination = "/topic/" + path;
		System.out.println("Adding user to " + destination + ": " + chatMessage);
		messagingTemplate.convertAndSend(destination, chatMessage);
	}
}