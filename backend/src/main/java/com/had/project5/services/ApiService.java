package com.had.project5.services;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ApiService {
    private final String url="https://dev.abdm.gov.in/gateway/v0.5/sessions";
    private final String cliendId="SBX_002039";
    private final String clientSecret="216f7db8-6695-46d9-92b1-44f050dcd212";
    private final TokenStorageService tokenService;
    private final RestTemplate restTemplate;
    private final JwtService jwtService;

    public ApiService(TokenStorageService tokenService,RestTemplate restTemplate,JwtService jwtService){
        this.tokenService=tokenService;
        this.restTemplate=restTemplate;
        this.jwtService = jwtService;
    }
    public String getToken(){
        String currentToken=tokenService.getToken();
        if(currentToken!=null && jwtService.isTokenExpired(currentToken)){
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
            // System.out.println("Status Code: " + authResponse.getStatusCodeValue());

            System.out.println("Response Body: " + authResponse.getBody());
            JSONObject jsonResponse= new JSONObject(authResponse.getBody());
            String jwtToken=jsonResponse.getString("accessToken");
            // System.out.println("Headers: " + authResponse.getHeaders());
            // String jwtToken = authResponse.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            // System.out.println(jsonResponse);
            return jwtToken;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
