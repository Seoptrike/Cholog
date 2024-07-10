package com.example.dao.qa;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QaVO;

public interface QADAO {
	public List<HashMap<String, Object>> list();
    public void delete(int qa_key);
    public void insert(QaVO vo);
    public QaVO read(int qa_key);
    public void update(QaVO vo);
}
