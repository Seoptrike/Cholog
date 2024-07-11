package com.example.controller.bbs;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.dao.bbs.BBSDAO;
import com.example.domain.BBSVO;
import com.example.domain.QueryVO;
import com.example.service.bbs.BBSService;

@RestController
@RequestMapping("/bbs")
public class BBSRestController {

    @Autowired
    private BBSDAO bbsDAO;
    
    @Autowired
	BBSService service;

    @GetMapping("/list.json")
	public HashMap<String, Object> list(QueryVO vo) {
	    HashMap<String, Object> map = new HashMap<>();
	    List<HashMap<String, Object>> list = bbsDAO.list(vo);
	    map.put("documents", list);
	    map.put("total", bbsDAO.total(vo));
	    return map;
	}
    
    @PostMapping("/update/{bbs_key}")
	public void update(@RequestBody BBSVO vo) {
		bbsDAO.update(vo);
	}
    
    @PostMapping("/insert")
    public void insert(@RequestBody BBSVO vo) {
    	bbsDAO.insert(vo);
    }

    @PostMapping("/delete/{bbs_key}")
	public void delete(@PathVariable("bbs_key") int bid) {
		bbsDAO.delete(bid);
	}
    
    @GetMapping("/read/{bbs_key}")
	public BBSVO read(@PathVariable("bbs_key") int bid, Model model) {
    	model.addAttribute("bbs", service.read(bid));
		return bbsDAO.read(bid);
	}
}
