package com.example.dao.bbs;

import java.util.HashMap;
import java.util.List;
import com.example.domain.BBSVO;
import com.example.domain.QueryVO;

public interface BBSDAO {
    public List<HashMap<String, Object>> list();
    public void delete(int bbs_key);
    public void insert(BBSVO vo);
    public BBSVO read(int bbs_key);
    public void update(BBSVO vo);
}
