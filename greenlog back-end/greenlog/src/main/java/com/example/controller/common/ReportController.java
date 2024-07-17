package com.example.controller.common;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.report.ReportDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReportVO;

@RestController
@RequestMapping("/report")
public class ReportController {
	@Autowired
	ReportDAO rdao;

	@PostMapping("/insert")
	public void insert(@RequestBody ReportVO vo) {
		rdao.insert(vo);
	}

	@GetMapping("/list")
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return rdao.list(vo);
	}

	@GetMapping("/count")
	public int count() {
		return rdao.count();
	}
}
