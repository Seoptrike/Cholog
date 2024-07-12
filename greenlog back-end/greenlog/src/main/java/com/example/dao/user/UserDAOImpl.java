package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.UserVO;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.UserMapper";

	@Override
	public List<HashMap<String, Object>> adminList(QueryVO vo) {
		return session.selectList(namespace + ".adminList", vo);
	}

	@Override
	public void insert(UserVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public UserVO read(String uid) {
		return session.selectOne(namespace + ".read", uid);
	}

	@Override
	public void delete(int user_key) {
		session.delete(namespace + ".delete", user_key);

	}

	@Override
	public void update(UserVO vo) {
		session.update(namespace + ".adminUpdate", vo);

	}

	@Override
	public void imgUpdate(String img, String uid) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("img", img);
		map.put("uid", uid);
		session.update(namespace + ".imgUpdate", map);
	}

	@Override
	public void updatePerson(UserVO vo) {
		session.update(namespace + ".personUpdate", vo);

	}

	@Override
	public HashMap<String, Object> mypage1(String uid) {
		return session.selectOne(namespace + ".mypage1", uid);
	}

	@Override
	public List<HashMap<String, Object>> mypage2(String uid) {
		return session.selectList(namespace + ".mypage2", uid);
	}

	@Override
	public HashMap<String, Object> mypage3(String uid) {
		return session.selectOne(namespace + ".mypage3", uid);
	}

	@Override
	public UserVO findid(UserVO vo) {
		return session.selectOne(namespace + ".findid", vo);
	}

	@Override
	public UserVO findpass(UserVO vo) {
		return session.selectOne(namespace + ".findpass", vo);
	}

	@Override
	public void updatePass(UserVO vo) {
		session.update(namespace + ".updatePass", vo);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".adminListTotal", vo);
	}

	@Override
	public int mypage4(String uid1, String uid2) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("auction_seller", uid1);
		map.put("auction_buyer" , uid2);
		return session.selectOne(namespace + ".mypage4" , map);
	}

}
