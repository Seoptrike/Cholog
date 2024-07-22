package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.MysqlDAO;
import com.example.dao.seed.AuctionDAO;
import com.example.domain.QueryVO;

@SpringBootTest
public class MysqlTest {
	@Autowired
	AuctionDAO dao;
	@Test
	public void test() {
		QueryVO vo = new QueryVO();
		vo.setKey("auction_regDate");
		vo.setWord("");		
		vo.setPage(1);
		vo.setSize(5);
		String uid = "seop";
		dao.userAList(uid, vo);
	
	}
}