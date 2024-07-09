package com.example.controller.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ssl.SslProperties.Bundles.Watch.File;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.user.UserDAO;

@RestController
@RequestMapping("/upload")
public class ImgUploadController {
	@Autowired
	UserDAO udao;
	
	//이미지업로드
//	@PostMapping("/img/{uid}")
//	public void photo(@PathVariable("uid") String uid, MultipartHttpServletRequest multi) throws Exception{
//		MultipartFile file=multi.getFile("file");
//		try {
//			if(!file.isEmpty()) {
//				String filePath = "/project/Green-log/";
//				String fileName = System.currentTimeMillis() + ".jpg";
//				File folder = new File("C:" + filePath);
//				 if(!folder.exists()) folder.mkdir();
				 
//				file.transferTo(new File("C:" + filePath + fileName));
//				udao.imgUpdate(filePath+fileName, uid);
//			}
//		}catch(Exception e) {
//			System.out.println("사진업로드오류:" + e.toString());
//		}
		
//		}
}
