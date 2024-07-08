package com.example.controller.common;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/user/login/kakao")
public class KakaoLoginController {

	private final String clientId = "02059f168b6e2f91d0014fde2e56581e";
	private final String clientSecret = "ZwB1MHMvI1fNOOnmw5sVykfYZ9skNVdk"; // 여기에 클라이언트 시크릿을 추가하세요

	@GetMapping
	public Map<String, String> getAccessToken(@RequestParam("code") String code) {
		System.out.println("code = " + code);

		// 1. header 생성
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8");

		// 클라이언트 시크릿 추가
		httpHeaders.setBasicAuth(clientId, clientSecret);

		// 2. body 생성
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code"); // 고정값
		params.add("redirect_uri", "http://localhost:8080/user/login/kakao"); // 등록한 redirect uri
		params.add("code", code);

		// 3. header + body
		HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, httpHeaders);

		// 4. http 요청하기
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> response;
		try {
			response = restTemplate.exchange("https://kauth.kakao.com/oauth/token", HttpMethod.POST, httpEntity,
					Map.class);
		} catch (HttpClientErrorException.Unauthorized e) {
			System.err.println("Failed to get access token: Unauthorized");
			return null;
		} catch (Exception e) {
			System.err.println("Failed to get access token: " + e.getMessage());
			return null;
		}

		if (response.getStatusCode().is2xxSuccessful()) {
			Map<String, Object> responseBody = response.getBody();
			if (responseBody != null) {
				String accessToken = (String) responseBody.get("access_token");
				System.out.println("accessToken = " + accessToken);
				return getUserInfo(accessToken);
			} else {
				System.err.println("Failed to get response body: " + response.getStatusCode());
			}
		} else {
			System.err.println("Failed to get access token: " + response.getStatusCode());
			System.err.println("Response body: " + response.getBody());
		}
		return null;
	}

	private Map<String, String> getUserInfo(String accessToken) {
		// 1. header 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
		headers.add(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8");

		// 2. header 설정
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);

		// 3. http 요청하기
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> response;
		try {
			response = restTemplate.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.GET, request, Map.class);
		} catch (HttpClientErrorException.Unauthorized e) {
			System.err.println("Failed to get user info: Unauthorized");
			return null;
		} catch (Exception e) {
			System.err.println("Failed to get user info: " + e.getMessage());
			return null;
		}

		if (response.getStatusCode().is2xxSuccessful()) {
			Map<String, Object> userInfo = response.getBody();
			if (userInfo != null) {
				System.out.println("response = " + userInfo);

				// 필요한 사용자 정보 추출
				String id = userInfo.get("id").toString();
				Map<String, String> properties = (Map<String, String>) userInfo.get("properties");
				String nickname = properties.get("nickname");

				System.out.println("id = " + id);
				System.out.println("nickname = " + nickname);

				// 사용자 정보를 JSON 형식으로 반환
				Map<String, String> result = new HashMap<>();
				result.put("id", id);
				result.put("nickname", nickname);

				return result;
			} else {
				System.err.println("Failed to get response body: " + response.getStatusCode());
			}
		} else {
			System.err.println("Failed to get user info: " + response.getStatusCode());
			System.err.println("Response body: " + response.getBody());
		}
		return null;
	}
}
