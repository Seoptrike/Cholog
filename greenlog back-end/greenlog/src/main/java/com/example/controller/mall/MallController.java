package com.example.controller.mall;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.mall.MallDAO;
import com.example.domain.MallPhotoVO;
import com.example.domain.MallVO;
import com.example.domain.QueryVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/mall")
public class MallController {
	
	@Autowired
	MallDAO mdao;
	
	@GetMapping("/list")
	public List  <HashMap<String, Object>> list(QueryVO vo) {
		return mdao.list(vo);
	}
	
	
	@PostMapping("/insert")
	public void insert (@RequestBody MallVO vo) {
		mdao.insert(vo);
	}
	@PostMapping("/insertPhoto")
	public void insert (@RequestBody MallPhotoVO pvo) {
		mdao.insert(pvo);
	}

}
