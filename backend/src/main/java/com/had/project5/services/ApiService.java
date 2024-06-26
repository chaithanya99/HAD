package com.had.project5.services;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import reactor.core.publisher.Mono;

@Service
public class ApiService {
    private final String BASE_URL="https://healthidsbx.abdm.gov.in/api";
    private final String url="https://dev.abdm.gov.in/gateway/v0.5/sessions";
    private final String cliendId="SBX_002039";
    private final String clientSecret="216f7db8-6695-46d9-92b1-44f050dcd212";
    private final TokenStorageService tokenService;
    private final RestTemplate restTemplate;
    private final JwtService jwtService;
    private WebClient webClient;
    public ApiService(TokenStorageService tokenService,RestTemplate restTemplate,JwtService jwtService,WebClient.Builder webClientBuilder){
        this.tokenService=tokenService;
        this.restTemplate=restTemplate;
        this.jwtService = jwtService;
        this.webClient=webClientBuilder.baseUrl("https://healthidsbx.abdm.gov.in/api").build();
    }
    public String getToken(){
        String currentToken=tokenService.getToken();
        if(currentToken!=null && !isTokenExpired(currentToken, tokenService.getExpiry())){
            return currentToken;
        }
        else{
            String newToken=getNewToken();
            tokenService.setToken(newToken);
            return newToken;
        }
    }
    private String getNewToken(){
        try {
            HttpHeaders authHeader=new HttpHeaders();
            authHeader.setContentType(MediaType.APPLICATION_JSON);
            Map<String,String> payload=new HashMap<>();
            payload.put("clientId",cliendId);
            payload.put("clientSecret",clientSecret);
            String jsonPayload=new ObjectMapper().writeValueAsString(payload);
            HttpEntity<String> entity=new HttpEntity<>(jsonPayload,authHeader);
            ResponseEntity<String> authResponse = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            System.out.println("Response Body: " + authResponse.getBody());
            JSONObject jsonResponse= new JSONObject(authResponse.getBody());
            String jwtToken=jsonResponse.getString("accessToken");
            long expiry = System.currentTimeMillis() / 1000 + 1200;
            tokenService.setExpiry(expiry);
            return jwtToken;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
    public String makePostRequest(String endpoint, String jsonPayload) {
            HttpHeaders authHeader=new HttpHeaders();
            authHeader.setContentType(MediaType.APPLICATION_JSON);
            authHeader.setBearerAuth(getToken());
             Map<String,String> payload=new HashMap<>();
            HttpEntity<String> entity=new HttpEntity<>(jsonPayload,authHeader);
            ResponseEntity<String> authResponse = restTemplate.exchange(BASE_URL+endpoint, HttpMethod.POST, entity, String.class);
            System.out.println(authResponse.getBody());
            return authResponse.getBody();
    }

    public String makePatchRequest(String endpoint, String jsonPayload){
        HttpHeaders authHeader=new HttpHeaders();
        authHeader.setContentType(MediaType.APPLICATION_JSON);
        authHeader.setBearerAuth(getToken());
        Map<String,String> payload=new HashMap<>();
        HttpEntity<String> entity=new HttpEntity<>(jsonPayload,authHeader);
        ResponseEntity<String> authResponse = restTemplate.exchange(endpoint, HttpMethod.PATCH, entity, String.class);
        System.out.println(authResponse.getBody());
        return authResponse.getBody();
    }

    public String catfact(String endpoint) {
        ResponseEntity<String> authResponse = restTemplate.getForEntity(endpoint, String.class);
        System.out.println(authResponse.getBody());
        return authResponse.getBody();
    }


    public String makeGetRequest(String endpoint){
        return webClient.get().uri(endpoint).retrieve().bodyToMono(String.class).block();
    }
    
    public static boolean isTokenExpired(String token,long expiry) {
        System.out.println("in expiry check function");
        long currentTimeInSeconds = System.currentTimeMillis() / 1000;
        System.out.println(expiry < currentTimeInSeconds);
        return expiry < currentTimeInSeconds;
    }
}
