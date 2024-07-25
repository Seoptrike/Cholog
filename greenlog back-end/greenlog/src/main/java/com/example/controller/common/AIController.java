package com.example.controller.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

	private final RestTemplate restTemplate = new RestTemplate();

	private final String API_KEY = "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";
	private final String API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

	@PostMapping("/check-similarity")
	public ResponseEntity<Map<String, Object>> checkSimilarity(@RequestBody Map<String, Object> requestBody) {
		// Extract source_sentence and sentences from requestBody
		String sourceSentence = (String) requestBody.get("source_sentence");
		List<String> sentences = (List<String>) requestBody.get("sentences");

		// Create the request payload for external API
		Map<String, Object> requestPayload = new HashMap<>();
		requestPayload.put("source_sentence", sourceSentence);
		requestPayload.put("sentences", sentences);
		// Convert requestPayload to JSON string
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonRequestPayload;
		try {
			jsonRequestPayload = objectMapper.writeValueAsString(requestPayload);
			System.out.println("Request Payload: " + jsonRequestPayload); // 로그 출력
		} catch (JsonProcessingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Failed to convert request payload to JSON"));
		}

		// Set headers
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + API_KEY);

		// Create HTTP entity
		HttpEntity<String> entity = new HttpEntity<>(jsonRequestPayload, headers);

		// Make POST request to external API
		ResponseEntity<String> response;
		try {
			response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);
		} catch (HttpClientErrorException e) {
			return ResponseEntity.status(e.getStatusCode()).body(Map.of("error", e.getResponseBodyAsString()));
		}

		// Parse similarity score from response
		double similarityScore = extractSimilarityScore(response.getBody());

		// Return similarity score
		Map<String, Object> result = new HashMap<>();
		result.put("similarity", similarityScore);
		return ResponseEntity.ok(result);
	}

	private double extractSimilarityScore(String responseBody) {
		// Dummy values for demonstration
		double[] embedding1 = {}; // Extract embedding for text1
		double[] embedding2 = {}; // Extract embedding for text2

		// Compute cosine similarity between embedding1 and embedding2
		return computeCosineSimilarity(embedding1, embedding2);
	}

	private double computeCosineSimilarity(double[] vec1, double[] vec2) {
		double dotProduct = 0.0;
		double normA = 0.0;
		double normB = 0.0;

		for (int i = 0; i < vec1.length; i++) {
			dotProduct += vec1[i] * vec2[i];
			normA += Math.pow(vec1[i], 2);
			normB += Math.pow(vec2[i], 2);
		}

		normA = Math.sqrt(normA);
		normB = Math.sqrt(normB);

		return dotProduct / (normA * normB);
	}
}
