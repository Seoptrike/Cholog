package com.example.controller.Seed;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.seed.AuctionDAO;
import com.example.domain.AuctionVO;
import com.example.domain.QueryVO;
import com.example.service.Trade.TradeService;

@RestController
@RequestMapping("/auction")
public class AuctionController {

	@Autowired
	TradeService Tservice;

	@Autowired
	AuctionDAO adao;

	@PostMapping("/insert")
	public void insert(@RequestBody AuctionVO vo) {
		adao.insert(vo);
	}

	@GetMapping("/list/{uid}")
	public HashMap<String, Object> userAList(@PathVariable("uid") String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		List<HashMap<String, Object>> list = adao.userAList(uid, vo);
		map.put("documents", list);
		map.put("total", adao.total(uid));
		return map;
	}
}
