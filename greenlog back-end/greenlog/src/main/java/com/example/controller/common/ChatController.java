package com.example.controller.common;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.user.ChatDAO;
import com.example.domain.ChatVO;
import com.example.domain.ChatlogVO;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ChatController {
	@Autowired
	ChatDAO cdao;

	@Autowired
	SimpMessagingTemplate messagingTemplate;

	// 채팅방갯수
	@GetMapping("/chat/listCount")
	public int listCount() {
		return cdao.listCount();
	}

	// chatkey찾기
	@GetMapping("/chat/searchChatkey/{uid}")
	public int searchChatKey(@PathVariable("uid") String uid) {
		return cdao.searchChatkey(uid);
	}

	// 메시지 저장
	@PostMapping("/chat/saveMsg")
	public void insertChatlog(@RequestBody ChatlogVO vo) {
		cdao.insertChatlog(vo);
	}

	// 저장된 메시지 출력
	@GetMapping("/chat/listMsg/{key}")
	public List<HashMap<String, Object>> listchatLog(@PathVariable("key") String key) {
		int Chat_key = Integer.parseInt(key);
		return cdao.listchatLog(Chat_key);
	}

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
		ChatlogVO vo2 = new ChatlogVO();
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