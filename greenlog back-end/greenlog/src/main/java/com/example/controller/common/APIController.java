package com.example.controller.common;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class APIController {
	private final String servicekey = "13Rf4cCUQibYUM9pzyU25ZAwb6/IBInaC6Na3iLphuYUVoGZM+ygMZsGsqpkKTEGgcbbu4wEVgj/2ZvqibYE6Q==";
	private final String returnType = "xml";
	private final String numOfRows = "100";
	private final String pageNo = "1";
	private final String sidoName = "서울";
	private final String ver = "1.0";

	@GetMapping("/air")
	public ResponseEntity<String> fetchData() {
		try {
			String encodedSidoName = URLEncoder.encode(sidoName, StandardCharsets.UTF_8.toString());
			URLDecoder.decode(servicekey, "UTF-8");
			String url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
			url += "?serviceKey=" + servicekey;
			url += "&returnType=" + returnType;
			url += "&numOfRows=" + numOfRows;
			url += "&pageNo=" + pageNo;
			url += "&sidoName=" + encodedSidoName;
			url += "&ver=" + ver;

			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, null, String.class);

			if (responseEntity.getStatusCode().is2xxSuccessful()) {
				return ResponseEntity.ok(responseEntity.getBody());
			} else {
				return ResponseEntity.status(responseEntity.getStatusCode())
						.body("Failed to get data. Status code: " + responseEntity.getStatusCodeValue());
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to fetch data: " + e.getMessage());
		}
	}
}
