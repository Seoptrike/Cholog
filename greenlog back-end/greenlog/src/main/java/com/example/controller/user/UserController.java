package com.example.controller.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ssl.SslProperties.Bundles.Watch.File;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.*;


import com.example.dao.user.UserDAO;
import com.example.domain.UserVO;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserDAO udao;

	@Autowired
	PasswordEncoder encoder;

	@GetMapping("/admin/list")
	public List<HashMap<String, Object>> adminList() {
		return udao.adminList();
	}
	
	@PostMapping("/delete/{user_key}")
	public void delete(@PathVariable("user_key") int user_key) {
		udao.delete(user_key);
	}

	@PostMapping("/insert")
	public void insert(@RequestBody UserVO vo) {
		// 비밀번호 암호화
		String upass = encoder.encode(vo.getUser_upass());
		vo.setUser_upass(upass);
		;
		udao.insert(vo);
	}

	@GetMapping("/read/{user_uid}")
	public UserVO read(@PathVariable("user_uid") String uid) {
		return udao.read(uid);
	}
	
	//관리자용 업데이트(권한수정가능)
	@PostMapping("/admin/update")
	public void update(@RequestBody UserVO vo) {
		udao.update(vo);
		System.out.println(vo.getUser_gender());
	}
		
	@PostMapping("/login")
	public int login(@RequestBody UserVO vo) {
		int result = 0; // 아이디없음
		UserVO user = udao.read(vo.getUser_uid());
		if (user != null) {
			if (encoder.matches(vo.getUser_upass(), user.getUser_upass())) {
				result = 1; // 로그인 성공
			} else {
				result = 2; // 비밀번호 틀림
			}
		}
		return result;
	}
	
	
}
