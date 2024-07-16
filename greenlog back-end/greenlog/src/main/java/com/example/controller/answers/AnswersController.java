package com.example.controller.answers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.answers.AnswersDAO;
import com.example.domain.AnswersVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/answers")
public class AnswersController {

	@Autowired
	AnswersDAO dao;

    @PostMapping("/insert")
    public void insert(@RequestBody AnswersVO vo) {
        dao.insert(vo);
    }

    @PostMapping("/update/{answers_key}")
    public void update(@RequestBody AnswersVO vo) {
        dao.update(vo);
    }

    @PostMapping("/delete/{answers_key}")
    public void delete(@PathVariable("answers_key") int answers_key) {
        dao.delete(answers_key);
    }

    @GetMapping("/read/{answers_key}")
    public AnswersVO read(@PathVariable("answers_key") int answers_key) {
        return dao.read(answers_key);
    }

    @GetMapping("/list.json")
    public List<HashMap<String, Object>> list(@RequestParam("QA_key") int QA_key) {
    	return dao.list(QA_key);
    }
  }
