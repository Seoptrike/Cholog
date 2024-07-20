package com.example.service.bbs;

import java.util.HashMap;
import java.util.List;

import com.example.domain.BBSVO;

public interface BBSService {
	public HashMap<String, Object> read(int bbs_key);

	public List<BBSVO> getTopList();
}
