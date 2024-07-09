package com.example.service.mall;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.mall.MallDAO;
import com.example.domain.MallPhotoVO;
import com.example.domain.MallVO;
@Service

public class MallServiceImpl implements MallService{
	@Autowired
	MallDAO mdao ;
	
	@Transactional
	@Override
	public void insertAll(MallVO vo, MallPhotoVO pvo) {
		 mdao.insertInfo(vo);
//	     if (pvo != null) {
//	    	 mdao.insertPhoto(pvo);
//	     }
	}
	
	
	
	


}
