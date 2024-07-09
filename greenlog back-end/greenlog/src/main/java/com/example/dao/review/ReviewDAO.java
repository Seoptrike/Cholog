package com.example.dao.review;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.ReviewVO;

public interface ReviewDAO {
	
	public void insert (ReviewVO vo);
	public List<HashMap<String, Object>> reviewList(QueryVO vo);
	public void delete (int review_key);
	public void update (ReviewVO vo);
	public void updateLock (ReviewVO vo);

}
