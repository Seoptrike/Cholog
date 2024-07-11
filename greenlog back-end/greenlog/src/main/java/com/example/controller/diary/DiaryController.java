package com.example.controller.diary;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.diary.DiaryDAO;
import com.example.domain.DiaryVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/diary")
public class DiaryController {
	@Autowired
	DiaryDAO dao;
	
	@PostMapping("/insert")
	public void insert(@RequestBody DiaryVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping("/read/{diary_key}")
	public DiaryVO read(@PathVariable("diary_key") int key) {
		return dao.read(key);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody DiaryVO vo) {
		dao.update(vo);
	}
	
	@GetMapping("/list.json/{user_uid}")
	public HashMap<String, Object> personList(@PathVariable("user_uid") String uid, QueryVO vo) {
		HashMap<String,Object> map=new HashMap<>();
		map.put("documents", dao.personList(uid, vo));
		map.put("total", dao.pTotal(uid));
		return map;
	}
	
	@GetMapping("/admin/list")
	public List<HashMap<String, Object>> adminList() {
		return dao.adminList();
	}
	
	@PostMapping("/delete/{diary_key}")
	public void delete(@PathVariable("diary_key") int key) {
		dao.delete(key);
	}
	
	@PostMapping("/like/{user_uid}")
	public void likepress(@RequestParam("diary_key") int key, @PathVariable("user_uid") String uid) {
		dao.likePress(key, uid);
	}
}
