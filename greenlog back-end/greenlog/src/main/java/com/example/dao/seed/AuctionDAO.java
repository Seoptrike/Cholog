package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import com.example.domain.AuctionVO;

public interface AuctionDAO {
	public void insert(AuctionVO vo);

	public List<HashMap<String, Object>> userAList(String uid);
}
