package com.had.project5.controllers;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.had.project5.services.ApiService;
import com.had.project5.services.Encryption;
import com.had.project5.services.JwtService;

@RestController

@RequestMapping("/linking")
public class LinkingController {
    @Autowired
    private ApiService apiService;
    @Autowired
    private Encryption encryption;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/get_registered_facilities")
    public String getRegisteredFacilities(){
        // write code for getting all registered facilities
        return "WORKING ON THIS";
    }

    @PostMapping("/register_host_url")
    public ResponseEntity<Map<String, String>> generateOtp(@RequestBody Map<String,String> req) throws Exception{
        try {
            System.out.println("Registering host url.");
            System.out.println(req);
            String url;
            url = req.get("url");
            Map<String,String> payload=new HashMap<>();
            payload.put("url",url);
            String jsonPayload=new ObjectMapper().writeValueAsString(payload);
            String res=apiService.makePatchRequest("https://dev.abdm.gov.in/devservice/v1/bridges",jsonPayload);
            JSONObject jsonResponse= new JSONObject(res);
            System.out.println(jsonResponse);
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("message", "URL changed successfully!");
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        }
    }



}
