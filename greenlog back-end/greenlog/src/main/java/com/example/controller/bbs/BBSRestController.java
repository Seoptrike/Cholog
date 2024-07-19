package com.example.controller.bbs;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.WebUtils;

import com.example.dao.bbs.BBSDAO;
import com.example.domain.BBSPhotoVO;
import com.example.domain.BBSVO;
import com.example.domain.QueryVO;
import com.example.service.bbs.BBSService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/bbs")
public class BBSRestController {

    @Autowired
    private BBSDAO bbsDAO;
    
    @Autowired
    private BBSService service;

    @GetMapping("/list.json")
    public HashMap<String, Object> list(QueryVO vo) {
        HashMap<String, Object> map = new HashMap<>();
        List<HashMap<String, Object>> list = bbsDAO.list(vo);
        map.put("documents", list);
        map.put("total", bbsDAO.total(vo));
        return map;
    }

    @GetMapping("/top")
    public List<BBSVO> topList() {
        return bbsDAO.topList();
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
    public BBSVO read(@PathVariable("bbs_key") int bid, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----------------------------------------" + bid);
        Cookie oldCookie = WebUtils.getCookie(request, "bbsView");

        if(oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + bid + "]")) {
                oldCookie.setValue(oldCookie.getValue() + "_" + "[" + bid + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                response.addCookie(oldCookie);
                return service.read(bid);
            } else {
                return bbsDAO.read(bid);
            }
        } else {
            Cookie newCookie = new Cookie("bbsView", "[" + bid + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            response.addCookie(newCookie);
            return service.read(bid);
        }
    }
    
    // 사진 여러 개 삽입
    @PostMapping("/attach/{bbsphoto_bbsKey}")
    public void photoInsert(@PathVariable("bbsphoto_bbsKey") String bbsphoto_bbsKey, MultipartHttpServletRequest multi) {
        try {
            String filePath = "bbsUpload/" + bbsphoto_bbsKey + "/";
            String directory = System.getProperty("user.dir");
            String uploadPath = directory + File.separator + filePath;

            File folder = new File(uploadPath);
            if (!folder.exists())
                folder.mkdir();
            List<MultipartFile> files = multi.getFiles("bytes");
            if (!files.isEmpty()) {
                for (int i = 0; i < files.size(); i++) {
                    MultipartFile file = files.get(i);
                    
                    if (!file.isEmpty()) {
                        String fileName = UUID.randomUUID().toString() + ".jpg";
                        file.transferTo(new File(uploadPath + fileName));
                        System.out.println("Uploaded file: " + fileName);

                        BBSPhotoVO vo = new BBSPhotoVO();
                        vo.setBbsPhoto_bbs_Key(Integer.parseInt(bbsphoto_bbsKey));
                        vo.setBbsPhoto_filename("/bbs/display?file=" + bbsphoto_bbsKey + "/" + fileName);
                        vo.setBbsPhoto_sequence(i);
                        bbsDAO.photoInsert(vo);
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("BBS 사진 업로드 오류: " + e.toString());
        }
    }

    @GetMapping("/display") // 테스트 /bbs/display?file=파일이름
    public ResponseEntity<Resource> display(@RequestParam("file") String file) {
        try {
            // 상대 경로를 절대 경로로 변환하여 Resource 생성
            String relativePath = "bbsUpload/";
            String absolutePath = System.getProperty("user.dir") + File.separator + relativePath;
            Path filePath = Paths.get(absolutePath + file);

            // 파일이 존재하는지 확인
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // 파일의 MIME 타입을 확인하여 HTTP 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath));

            return ResponseEntity.ok().headers(headers).body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 게시물 수정 시, 원래 사진 가져오기
    @GetMapping("/attach/{bbsphoto_bbsKey}")
    public List<HashMap<String, Object>> photoSelect(@PathVariable("bbsphoto_bbsKey") int bbsphoto_bbsKey) {
        return bbsDAO.photoSelect(bbsphoto_bbsKey);
    }

    // 게시물 사진 한 개 삭제
    @PostMapping("/attach/delete")
    public int deleteAttach(@RequestBody BBSPhotoVO vo) {
        try {
            // 파일 경로 처리
            String displayPath = vo.getBbsPhoto_filename();
            int index = displayPath.indexOf("/bbs/display?file=");
            String relativePath = displayPath.substring(index + "/bbs/display?file=".length());

            // 현재 작업 디렉토리 확인
            String currentDir = System.getProperty("user.dir");
            String filePath = currentDir + File.separator + "bbsUpload" + File.separator + relativePath;

            // 파일 자체를 삭제
            File file = new File(filePath);
            if (file.exists()) {
                file.delete();
                System.out.println("Deleted file: " + filePath);
            }
            // DB에서 삭제
            bbsDAO.photoDelete(vo.getBbsPhoto_bbs_Key());
            return 1;

        } catch (Exception e) {
            System.out.println("첨부파일 삭제 오류: " + e.toString());
            return 0;
        }
    }
    
    // 이미지 한 개 삽입
    @PostMapping("/attachOne/{bbs_key}")
    public void insertPhoto(@PathVariable("bbs_key") int bbs_key, MultipartHttpServletRequest multi) {
        try {
            String filePath = "bbsUpload/" + bbs_key + "/";
            String directory = System.getProperty("user.dir");
            String uploadPath = directory + File.separator + filePath;
            
            File oldFile = new File(uploadPath);
            if (oldFile.exists()) {
                oldFile.delete();
            }
            
            MultipartFile file = multi.getFile("byte");
            if (file != null && !file.isEmpty()) {
                String fileName = UUID.randomUUID().toString() + ".jpg";
                File destFile = new File(uploadPath, fileName);
                file.transferTo(destFile);
                
                BBSPhotoVO vo = new BBSPhotoVO();
                vo.setBbsPhoto_bbs_Key(bbs_key);
                vo.setBbsPhoto_filename("/bbs/display?file=" + bbs_key + "/" + fileName);
                
                bbsDAO.photoInsert(vo);
            }
        } catch (Exception e) {
            System.out.println("이미지 하나 삽입 오류: " + e.toString());
        }
    }

    @PostMapping("/update/attach")
    public void updatePhoto(@RequestBody BBSPhotoVO vo) {
        System.out.println("............................." + vo.toString());
        bbsDAO.updatePhoto(vo);
    }
}
