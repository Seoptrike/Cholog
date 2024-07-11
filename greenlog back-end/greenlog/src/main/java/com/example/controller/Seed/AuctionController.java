package com.example.controller.Seed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.seed.AuctionDAO;
import com.example.domain.AuctionVO;
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
}
