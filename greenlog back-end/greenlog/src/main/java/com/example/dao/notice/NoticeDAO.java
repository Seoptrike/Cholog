package com.example.dao.notice;

import java.util.HashMap;
import java.util.List;

import com.example.domain.NoticeVO;

public interface NoticeDAO {
	public List<HashMap<String, Object>> list();
    public void delete(int notice_key);
    public void insert(NoticeVO vo);
    public NoticeVO read(int notice_key);
    public void update(NoticeVO vo);
}
