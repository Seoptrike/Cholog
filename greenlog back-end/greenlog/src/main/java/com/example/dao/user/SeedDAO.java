package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import com.example.domain.SeedVO;

public interface SeedDAO {
	public List<HashMap<String, Object>> list(SeedVO vo);
}
