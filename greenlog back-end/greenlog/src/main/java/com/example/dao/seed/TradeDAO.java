package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import com.example.domain.TradeVO;

public interface TradeDAO {
	public void insert(TradeVO vo);

	public List<HashMap<String, Object>> userList(String seed_number);
}
