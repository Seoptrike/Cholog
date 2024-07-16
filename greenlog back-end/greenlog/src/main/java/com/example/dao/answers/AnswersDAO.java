package com.example.dao.answers;

import java.util.HashMap;
import java.util.List;

import com.example.domain.AnswersVO;
import com.example.domain.QueryVO;

public interface AnswersDAO {
	public List<HashMap<String, Object>> list(int QA_key);
	public void insert(AnswersVO vo);
	public void update(AnswersVO vo);
	public void delete(int answers_key);
	public AnswersVO read(int answers_key);
	public int total(QueryVO vo);
}
