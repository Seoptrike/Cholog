package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.TestDAO;

@RestController
@RequestMapping("/test")
public class TestController {
	@Autowired
	TestDAO dao;

	@GetMapping("/list")
	public List<HashMap<String, Object>> list() {
		return dao.list();
	}
}
