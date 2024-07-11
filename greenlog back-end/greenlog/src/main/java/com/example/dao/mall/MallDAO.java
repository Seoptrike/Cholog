package com.example.dao.mall;

import java.util.HashMap;
import java.util.List;

import com.example.domain.MallVO;
import com.example.domain.QueryVO;
import com.example.domain.UserVO;

public interface MallDAO {
	//리스트(+셀러물품들),리드(+사진만+셀러정보),업데이트,딜리트
	
	public List<HashMap<String, Object>> list (QueryVO vo);
	
	public void insertInfo (MallVO vo);
	
	//public void insertPhoto (MallPhotoVO pvo);
	
	public HashMap<String,Object> read (int mall_key);
	
	public void update (MallVO vo);
	
	public void delete (int mall_key);
	
	public int total(QueryVO vo);
	
	
	
	
	
	

	
	
	

}
