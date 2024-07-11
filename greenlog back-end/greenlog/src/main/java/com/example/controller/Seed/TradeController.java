package com.example.controller.Seed;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.seed.TradeDAO;
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

	@PostMapping("/userList")
	public List<HashMap<String, Object>> userList(@RequestBody Map<String, String> requestBody) {
		String seed_number = requestBody.get("seed_number");
		return tdao.userList(seed_number);
	}
}
