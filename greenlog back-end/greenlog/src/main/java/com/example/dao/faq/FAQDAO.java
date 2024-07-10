package com.example.dao.faq;

import java.util.HashMap;
import java.util.List;

import com.example.domain.FAQVO;

public interface FAQDAO {
	public List<HashMap<String, Object>> list();
    public void delete(int faq_key);
    public void insert(FAQVO vo);
    public FAQVO read(int faq_key);
    public void update(FAQVO vo);
}
