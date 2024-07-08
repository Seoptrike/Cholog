//package com.example.service;
//
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.client.RestTemplate;
//
//public class AirQualityService {
//	public static void main(String[] args) {
//		final String serviceKey = "13Rf4cCUQibYUM9pzyU25ZAwb6%2FIBInaC6Na3iLphuYUVoGZM%2BygMZsGsqpkKTEGgcbbu4wEVgj%2F2ZvqibYE6Q%3D%3D";
//		final String returnType = "json";
//		final String numOfRows = "100";
//		final String pageNo = "1";
//		final String sidoName = "서울";
//		final String ver = "1.0";
//
//		String url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
//		url += "?serviceKey=" + serviceKey;
//		url += "&returnType=" + returnType;
//		url += "&numOfRows=" + numOfRows;
//		url += "&pageNo=" + pageNo;
//		url += "&sidoName=" + sidoName;
//		url += "&ver=" + ver;
//
//		RestTemplate restTemplate = new RestTemplate();
//		ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
//
//		if (responseEntity.getStatusCode().is2xxSuccessful()) {
//			String responseBody = responseEntity.getBody();
//			System.out.println("Response: " + responseBody);
//		} else {
//			System.err.println("Failed to get data. Status code: " + responseEntity.getStatusCodeValue());
//		}
//	}
//}
