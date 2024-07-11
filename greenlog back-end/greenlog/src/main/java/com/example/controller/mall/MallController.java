package com.example.controller.mall;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.mall.MallDAO;
import com.example.domain.MallVO;
import com.example.domain.QueryVO;
import com.example.domain.UserVO;
import com.example.service.mall.MallService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/mall")
public class MallController {
	
	@Autowired
	MallDAO mdao;
	@Autowired
	MallService mservice;
	
	@GetMapping("/list")
	public HashMap<String, Object> list(QueryVO vo) {
	    HashMap<String, Object> map = new HashMap<>();
	    List<HashMap<String, Object>> list = mdao.list(vo);
	    map.put("documents", list);
	    map.put("total", mdao.total(vo));
	    return map;
	}
	
	@PostMapping("/insert")
	public void insert (@RequestBody MallVO vo) {
		mdao.insertInfo(vo);
	}
	
	@GetMapping("/read/{mall_key}")
	public HashMap<String, Object> read(@PathVariable ("mall_key") int mall_key ) {
		return mdao.read(mall_key);
	}
	
	@PostMapping("/update")
	public void update (@RequestBody MallVO vo) {
		mdao.update(vo);
	}
	
	@PostMapping("/delete/{mall_key}")
	public void delete (@PathVariable("mall_key") int mall_key) {
		mdao.delete(mall_key);
	}
	
	
	
	

}
