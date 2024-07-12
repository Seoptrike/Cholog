package com.example.service.bbs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.bbs.BBSDAO;
import com.example.domain.BBSVO;

@Service
public class BBSServiceImpl implements BBSService{
	@Autowired
	BBSDAO bbsDAO;

	@Transactional
	@Override
	public BBSVO read(int bbs_key) {
		bbsDAO.updateViewcnt(bbs_key);
		return bbsDAO.read(bbs_key);
	}

}