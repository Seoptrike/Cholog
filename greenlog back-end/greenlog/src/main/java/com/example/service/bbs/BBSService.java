package com.example.service.bbs;

import java.util.List;

import com.example.domain.BBSVO;

public interface BBSService {
	public BBSVO read(int bbs_key);
	public List<BBSVO> getTopList(); 
}
