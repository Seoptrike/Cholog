package com.example.dao.user;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.ChatVO;

@Repository
public class ChatDAOImpl implements ChatDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.ChatMapper";

	@Override
	public void insertChat(ChatVO chatVO) {
		session.insert(namespace + ".insertChat", chatVO);

	}

	@Override
	public List<ChatVO> list() {
		return session.selectList(namespace + ".list");
	}

	@Override
	public void update() {
		session.update(namespace + ".update");
	}

}