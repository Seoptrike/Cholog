package com.example.controller.common;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.domain.ChatVO;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ChatController {

	private final SimpMessagingTemplate messagingTemplate;

	public ChatController(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	@MessageMapping("/chat.sendMessage")
	public void sendMessage(@Payload ChatVO chatMessage) {
		messagingTemplate.convertAndSendToUser(chatMessage.getReceiver(), "/queue/messages", chatMessage);
	}

	@MessageMapping("/chat.addUser")
	public void addUser(@Payload ChatVO chatMessage, SimpMessageHeaderAccessor headerAccessor) {
		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
	}
}
