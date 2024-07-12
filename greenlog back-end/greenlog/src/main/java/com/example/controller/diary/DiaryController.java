package com.example.controller.diary;

import java.io.File;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.diary.DiaryDAO;
import com.example.domain.DiaryLikeVO;
import com.example.domain.DiaryPhotoVO;
import com.example.domain.DiaryVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/diary")
public class DiaryController {
	@Autowired
	DiaryDAO dao;
	
	@PostMapping("/insert")
	public void insert(@RequestBody DiaryVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping("/read/{diary_key}")
	public HashMap<String, Object> read(@PathVariable("diary_key") int key, @RequestParam("user_uid") String uid) {
		return dao.read(key, uid);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody DiaryVO vo) {
		System.out.println(vo);
		dao.update(vo);
	}
	
	@GetMapping("/list.json/{diary_writer}")
	public HashMap<String, Object> personList(@PathVariable("diary_writer") String uid1, @RequestParam("user_uid") String uid2, QueryVO vo ) {
		HashMap<String,Object> map=new HashMap<>();
		map.put("documents", dao.personList(uid1, uid2, vo));
		map.put("total", dao.pTotal(uid1));
		return map;
	}
	
	@GetMapping("/admin/list")
	public List<HashMap<String, Object>> adminList() {
		return dao.adminList();
	}
	
	@PostMapping("/delete/{diary_key}")
	public void delete(@PathVariable("diary_key") int key) {
		dao.delete(key);
	}
	
	@PostMapping("/like")
	public void likepress(@RequestBody DiaryLikeVO vo) {
		dao.likePress(vo);
	}
	
	@PostMapping("/cancel")
	public void likeCancel(@RequestBody DiaryLikeVO vo) {
		dao.likeCancel(vo);
	}
	
	@PostMapping("/photo/insert")
	public void photoInsert(@RequestBody DiaryPhotoVO vo, MultipartHttpServletRequest multi) {
		try {
			String filePath="/projectUpload/diary" + dao.lastKey() + "/";
			File folder =new File("C:" + filePath);
			if(!folder.exists()) folder.mkdir();
			
			List<MultipartFile> files =multi.getFiles("bytes");
			for(MultipartFile file: files) {
				String fileName=UUID.randomUUID().toString() + "jpg";
				System.out.println(fileName);
				file.transferTo(new File("C:" + filePath + fileName));
				
				vo =new DiaryPhotoVO();
				vo.setDiaryPhoto_diary_key(dao.lastKey());
				vo.setDiaryPhoto_filename("/display?file=" + filePath + fileName);
				dao.photoInsert(vo);
			}
		}catch(Exception e) {
			System.out.println("다이어리사진업로드오류:" + e.toString());
		}
	}
	
	@PostMapping("/thumbnail")
	public void thumbnail(MultipartHttpServletRequest multi) {
		try {
			MultipartFile file = multi.getFile("file");
			String filePath="/projectUpload/thumbnail" + dao.lastKey() + "/"; 
			String fileName= dao.lastKey()+ ".jpg";
			
			File oldFile =new File(filePath + fileName);
			if(oldFile.exists()) {
				oldFile.delete();
			}else {
				int key= dao.lastKey();
				String thumbnail = "/display?file=" + filePath + fileName;
				dao.thumbnail(key, thumbnail);
			}
			
		}catch(Exception e) {
			System.out.println("대표썸네일업로드오류:" + e.toString());
		}
	}
}
