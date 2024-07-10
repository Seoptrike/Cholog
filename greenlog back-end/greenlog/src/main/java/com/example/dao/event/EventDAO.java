package com.example.dao.event;

import java.util.HashMap;
import java.util.List;

import com.example.domain.BBSVO;
import com.example.domain.EventVO;

public interface EventDAO {
	public List<HashMap<String, Object>> list();
    public void delete(int event_key);
    public void insert(EventVO vo);
    public EventVO read(int event_key);
    public void update(EventVO vo);
}
