package com.example.service.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.review.ReviewDAO;
import com.example.domain.ReviewVO;

@Service
public class ReviewServiceImpl implements ReviewService {
	
		@Autowired
		ReviewDAO rdao;

		@Transactional
		@Override
		public void update(ReviewVO vo) {
				rdao.update(vo);
		}
	
		@Transactional
		@Override
		public void updateLock(ReviewVO vo) {
				rdao.updateLock(vo);
			
		}

}
