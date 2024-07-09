package com.example.controller.reply;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.reply.ReplyDAO;
import com.example.domain.ReplyVO;

@RestController
@RequestMapping("/reply")
public class ReplyController {
	
		@Autowired
		ReplyDAO rdao;
		
		@GetMapping("/list")
		public List<HashMap<String, Object>> replyList() {
			return rdao.replyList();
			
		}
		
		@PostMapping("/insert")
		public void insert(@RequestBody ReplyVO vo) {
				rdao.insert(vo);
		}

}
