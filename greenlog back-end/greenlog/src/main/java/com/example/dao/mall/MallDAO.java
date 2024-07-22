package com.example.dao.mall;

import java.util.HashMap;
import java.util.List;

import com.example.domain.MallPhotoVO;
import com.example.domain.MallVO;
import com.example.domain.Query2VO;
import com.example.domain.QueryVO;

public interface MallDAO {
	// 리스트(+셀러물품들),리드(+사진만+셀러정보),업데이트,딜리트

	public List<HashMap<String, Object>> list(Query2VO vo);
	
	public List<HashMap<String, Object>> sellerList(String mall_seller,int page,int size);

	public void insertInfo(MallVO vo);

	public HashMap<String, Object> read(int mall_key);

	public void update(MallVO vo);
	
	public void updateEndDate(int mall_key);

	public void delete(int mall_key);

	public int total(Query2VO vo);

	public void insertPhoto(MallPhotoVO vo);

	public void deleteAttach(int mallPhoto_key);

	public int getLastInsertId();

	public List<HashMap<String, Object>> listMallPhoto(int mallPhoto_mall_key);

	public void insertMainPhoto(int mall_key, String mall_photo);

	public String getMainPhoto(int mall_key);

	public void updateMainPhoto(MallPhotoVO vo);
	
	public void updatePhoto(MallPhotoVO vo);

}
