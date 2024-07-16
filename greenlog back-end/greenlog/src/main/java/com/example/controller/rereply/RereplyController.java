package com.example.controller.rereply;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.rereply.RereplyDAO;
import com.example.domain.RereplyVO;

@RestController
@RequestMapping("/rereply")
public class RereplyController {
	
	@Autowired
	RereplyDAO rrdao;
	
		@PostMapping("/insert")
		public void insert (@RequestBody RereplyVO vo) {
				rrdao.insert(vo);
		}
		
		@PostMapping("/delete/{rereply_key}")
		public void delete (@PathVariable ("rereply_key") int rereply_key) {
				rrdao.delete(rereply_key);
		}
		
		@PostMapping("/update")
		public void update (@RequestBody RereplyVO vo) {
				rrdao.update(vo);
		}
		
		@GetMapping("/list/{reply_key}")
		public List<HashMap<String, Object>> replyList(@PathVariable("reply_key") int reply_key) {
				return rrdao.rereplyList(reply_key);
		}
		
}
