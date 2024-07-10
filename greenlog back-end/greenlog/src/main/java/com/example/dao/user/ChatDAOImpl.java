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
	public void insertChat(ChatVO vo) {
		session.insert(namespace + ".insertChat", vo);

	}

	@Override
	public List<ChatVO> list() {
		return session.selectList(namespace + ".list");
	}

	@Override
	public void update(ChatVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public List<ChatVO> alist() {
		return session.selectList(namespace + ".alreadylist");
	}

	@Override
	public void save(ChatVO vo) {
		session.update(namespace + ".saveChat", vo);
	}

}