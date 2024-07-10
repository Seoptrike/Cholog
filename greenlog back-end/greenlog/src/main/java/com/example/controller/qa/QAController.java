package com.example.controller.qa;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.qa.QADAO;
import com.example.domain.QaVO;


@RestController
@RequestMapping("/qa")
public class QAController {

	@Autowired
    private QADAO QDAO;

    @GetMapping("/list")
    public List<HashMap<String, Object>> list(){
        return QDAO.list();
    }

    @PostMapping("/update/{qa_key}")
	public void update(@RequestBody QaVO vo) {
		QDAO.update(vo);
	}
    
    @PostMapping("/insert")
    public void insert(@RequestBody QaVO vo) {
    	QDAO.insert(vo);
    }

    @PostMapping("/delete/{qa_key}")
	public void delete(@PathVariable("qa_key") int qid) {
		QDAO.delete(qid);
	}
    
    @GetMapping("/read/{qa_key}")
	public QaVO read(@PathVariable("qa_key") int qid) {
		return QDAO.read(qid);
	}
}

