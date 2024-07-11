package com.example.controller.notice;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.notice.NoticeDAO;
import com.example.domain.NoticeVO;
import com.example.domain.QaVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/notice")
public class NoticeController {

	@Autowired
	private NoticeDAO NDAO;
	
	@GetMapping("/list.json")
	public HashMap<String, Object> list(QueryVO vo) {
	    HashMap<String, Object> map = new HashMap<>();
	    List<HashMap<String, Object>> list = NDAO.list(vo);
	    map.put("documents", list);
	    map.put("total", NDAO.total(vo));
	    return map;
	}
	
	    @PostMapping("/update/{notice_key}")
		public void update(@RequestBody NoticeVO vo) {
			NDAO.update(vo);
		}
	    
	    @PostMapping("/insert")
	    public void insert(@RequestBody NoticeVO vo) {
	    	NDAO.insert(vo);
	    }

	    @PostMapping("/delete/{notice_key}")
		public void delete(@PathVariable("notice_key") int nid) {
			NDAO.delete(nid);
		}
	    
	    @GetMapping("/read/{notice_key}")
		public NoticeVO read(@PathVariable("notice_key") int nid) {
			return NDAO.read(nid);
		}
	}