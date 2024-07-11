package com.example.controller.reply;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.reply.ReplyDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReplyVO;
import com.example.service.reply.ReplyService;

@RestController
@RequestMapping("/reply")
public class ReplyController {
	
		@Autowired
		ReplyDAO rdao;
		
		@Autowired
		ReplyService rservice;
		
		@PostMapping("/insert")
		public void insert(@RequestBody ReplyVO vo) {
				rdao.insert(vo);
		}
		
		@PostMapping("/delete/{reply_key}")
		public void delete(@PathVariable("reply_key") int reply_key) {
				rdao.delete(reply_key);
		}
		
		@PostMapping("/update")
		public void update(@RequestBody ReplyVO vo) {
				rdao.update(vo);
		}
		
		@GetMapping("/list/{review_bbs_key}")
		public List<HashMap<String, Object>> replyList(@PathVariable("reply_bbs_key") int reply_bbs_key, QueryVO vo) {
				return rdao.replyList(reply_bbs_key, vo);
		}
		
		@GetMapping("/plist/{review_bbs_key}")
		public HashMap<String, Object> plist(@PathVariable("review_bbs_key") int review_bbs_key, QueryVO vo) {
				return rservice.plist(review_bbs_key, vo);
		}

}
