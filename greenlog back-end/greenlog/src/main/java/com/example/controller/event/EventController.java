package com.example.controller.event;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.event.EventDAO;
import com.example.domain.EventVO;

@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired
    private EventDAO EDAO;

    @GetMapping("/list")
    public List<HashMap<String, Object>> list(){
        return EDAO.list();
    }

    @PostMapping("/update/{event_key}")
	public void update(@RequestBody EventVO vo) {
		EDAO.update(vo);
	}
    
    @PostMapping("/insert")
    public void insert(@RequestBody EventVO vo) {
    	EDAO.insert(vo);
    }

    @PostMapping("/delete/{event_key}")
	public void delete(@PathVariable("event_key") int eid) {
		EDAO.delete(eid);
	}
    
    @GetMapping("/read/{event_key}")
	public EventVO read(@PathVariable("event_key") int eid) {
		return EDAO.read(eid);
	}
}