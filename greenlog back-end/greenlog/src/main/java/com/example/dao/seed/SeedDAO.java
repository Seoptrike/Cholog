package com.example.dao.seed;

import com.example.domain.SeedVO;
import com.example.domain.TradeVO;

public interface SeedDAO {
	public void insert(SeedVO vo);

	public SeedVO read(String uid);

	public void update(TradeVO vo);

}