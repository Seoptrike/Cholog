package com.example.controller.reply;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.reply.ReplyDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReplyLikeVO;
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
				rservice.update(vo);
		}
		
		@PostMapping("/update/lock")
		public void updateLock(@RequestBody ReplyVO vo) {
				rservice.updateLock(vo);
		}
		
		@PostMapping("/update/replyLike")
		public void replyLikeUpdate(@RequestBody ReplyLikeVO vo) {
				rservice.replyLikeUpdate(vo);
		}
		
		@GetMapping("/list/{reply_bbs_key}")
		public List<HashMap<String, Object>> replyList(@PathVariable("reply_bbs_key") int reply_bbs_key, @RequestParam("key") String key, QueryVO vo) {
				vo.setKey(key);
				System.out.println("Received key: ---------------------- " + key);
				return rdao.replyList(reply_bbs_key, vo);
		}
		
		@GetMapping("/plist/{reply_bbs_key}")
		public HashMap<String, Object> plist(@PathVariable("reply_bbs_key") int reply_bbs_key, QueryVO vo) {
				return rservice.plist(reply_bbs_key, vo);
		}
		
		@PostMapping("/reactionInsert")
		public void reactionInsert(@RequestBody ReplyLikeVO vo) {
				rservice.reactionInsert(vo);
		}
		
		@GetMapping("/reaction/like/{reply_key}")
		public int replyLikeCount(@PathVariable("reply_key") int reply_key) {
			return rdao.replyLikeCount(reply_key);
			
		}
		
		@GetMapping("/reaction/dislike/{reply_key}")
		public int replyDisLikeCount(@PathVariable("reply_key") int reply_key) {
			return rdao.replyDisLikeCount(reply_key);
		}
		
		@PostMapping("/readReaction")
		public String readReaction(@RequestBody ReplyLikeVO vo) {
			return rdao.readReaction(vo);
	
		}
		
		@GetMapping("/count/{reply_bbs_key}")
		public int count(@PathVariable("reply_bbs_key") int reply_bbs_key) {
			return rdao.total(reply_bbs_key);
		}
		

}
