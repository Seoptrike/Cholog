package com.example.controller.Seed;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.seed.TradeDAO;
import com.example.domain.QueryVO;
import com.example.domain.TradeVO;
import com.example.service.Trade.TradeService;

@RestController
@RequestMapping("/trade")
public class TradeController {

	@Autowired
	TradeService Tservice;

	@Autowired
	TradeDAO tdao;

	@PostMapping("/insert")
	public void insert(@RequestBody TradeVO vo) {
		Tservice.insert(vo);
	}

	@GetMapping("/userList/{seed_number}")
	public HashMap<String, Object> userList(@PathVariable("seed_number") String seed_number, QueryVO vo) {
		return Tservice.UserList(seed_number, vo);
	}
}
