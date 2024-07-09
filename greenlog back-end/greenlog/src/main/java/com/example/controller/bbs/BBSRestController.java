package com.example.controller.bbs;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.dao.bbs.BBSDAO;
import com.example.domain.BBSVO;

@RestController
@RequestMapping("/bbs")
public class BBSRestController {

    @Autowired
    private BBSDAO bbsDAO;

    @GetMapping("/list")
    public List<HashMap<String, Object>> list(){
        return bbsDAO.list();
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
	public BBSVO read(@PathVariable("bbs_key") int bid) {
		return bbsDAO.read(bid);
	}
}
