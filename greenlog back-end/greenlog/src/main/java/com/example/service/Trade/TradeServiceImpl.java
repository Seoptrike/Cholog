package com.example.service.Trade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.seed.SeedDAO;
import com.example.dao.seed.TradeDAO;
import com.example.domain.TradeVO;

@Service
public class TradeServiceImpl implements TradeService {
	@Autowired
	TradeDAO tdao;

	@Autowired
	SeedDAO sdao;

	@Transactional
	@Override
	public void insert(TradeVO vo) {

		tdao.insert(vo);
		sdao.update(vo);

		TradeVO vo2 = new TradeVO();
		String temp = vo.getTrade_from();
		vo2.setTrade_from(vo.getTrade_to());
		vo2.setTrade_to(temp);
		vo2.setSeed_number(temp);
		vo2.setTrade_state((vo.getTrade_state() * (-1)));
		vo2.setAmount(vo.getAmount());

		tdao.insert(vo2);
		sdao.update(vo2);
	}
}
