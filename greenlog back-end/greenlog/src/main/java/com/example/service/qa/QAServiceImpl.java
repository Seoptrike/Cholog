package com.example.service.qa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.qa.QADAO;
import com.example.domain.QaVO;

@Service
public class QAServiceImpl implements QAService{
	@Autowired
	QADAO QDAO;

	@Transactional
	@Override
	public QaVO read(int qa_key) {
		QDAO.updateViewcnt(qa_key);
		return QDAO.read(qa_key);
	}

}
