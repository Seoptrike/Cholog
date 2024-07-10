package com.example.controller.diary;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.diary.DiaryDAO;
import com.example.domain.DiaryVO;

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
	public HashMap<String,Object> read(@PathVariable("diary_key") int key) {
		return dao.read(key);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody DiaryVO vo) {
		dao.update(vo);
	}
}
