package com.example.controller.common;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class FileController {
	// 이미지보기
	@GetMapping("/display") // 테스트 /display?file=/download/mall/파일이름
	public ResponseEntity<Resource> display(@RequestParam("file") String file) {
		Resource resource = new FileSystemResource("c:" + file);
		if (!resource.exists())
			return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
		HttpHeaders header = new HttpHeaders();
		try {
			Path filePath = Paths.get("c:" + file);
			header.add("Content-type", Files.probeContentType(filePath));
		} catch (Exception e) {
			System.out.println("오류:" + e.toString());
		}
		return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
	}

	// 다운로드
	@PostMapping("/download") // 테스트 /download?file=http//~
	public void download(@RequestParam("file") String file) throws Exception {
		URL url = new URL(file);
		InputStream in = url.openStream();
		String filePath = "c:/download/mall/";
		String fileName = System.currentTimeMillis() + ".jpg";
		FileOutputStream out = new FileOutputStream(filePath + fileName);
		FileCopyUtils.copy(in, out);
	}
}
