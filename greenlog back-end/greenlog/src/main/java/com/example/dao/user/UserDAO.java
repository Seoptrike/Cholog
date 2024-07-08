package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import com.example.domain.UserVO;

public interface UserDAO {
	public List<HashMap<String, Object>> adminList();

	public void insert(UserVO vo);

	public UserVO read(String uid);
	
	public void delete(int user_key);
	
	public void update(UserVO vo);
}
