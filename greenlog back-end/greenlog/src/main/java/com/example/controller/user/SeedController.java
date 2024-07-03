package com.example.controller.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.user.SeedDAO;
import com.example.domain.SeedVO;

@RestController
@RequestMapping("/seed")
public class SeedController {
	@Autowired
	SeedDAO sdao;

	@GetMapping("/list")
	public List<HashMap<String, Object>> list(SeedVO vo) {
		return sdao.list(vo);
	}
}
