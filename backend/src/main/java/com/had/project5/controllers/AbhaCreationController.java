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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.had.project5.services.ApiService;
import com.had.project5.services.Encryption;
import com.had.project5.services.JwtService;

@RestController

    
// @RequestMapping("/getABHAtoken")
public class AbhaCreationController {
    @Autowired
    private ApiService apiService;
    @Autowired
    private Encryption encryption;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/getABHAtoken")
    public String getToken(){
        String token=apiService.getToken();

        System.out.println(token);
        return token;
    }

    @PostMapping("/generateOtp")
    public void generateOtp(@RequestBody Map<String,String> req) throws Exception{
        try {
            System.out.println("working fine");
        String encryptedAadhaar;
            encryptedAadhaar = encryption.encryptWithPublicKey(req.get("aadhaar"));
            Map<String,String> payload=new HashMap<>();
            // payload.put("aadhaar",req.get("aadhaar"));
            payload.put("aadhaar",encryptedAadhaar);
            String jsonPayload=new ObjectMapper().writeValueAsString(payload);
            // encryptedAadhaar=req.get("aadhaar");
            // JSONObject obj=new JSONObject();
            // obj.put("aadhaar", encryptedAadhaar);
            String res=apiService.makePostRequest("https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/generateOtp",jsonPayload);
            System.out.println(res);
        // System.out.println(apiService.makeGetRequest("/v1/auth/cert"));
        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        }
        
        
        
    }
    @PostMapping("/verifyAadhaarOTP")
    public void verifyAadhaarOTP(@RequestBody Map<String,String> req){
        
    }

    @PostMapping("/verifyToken")
    public void verifyToken(@RequestBody Map<String,String> req){
        String token = req.get("token");
        
        // apiService.isTokenExpired(token);
        jwtService.isTokenExpired(token);
    }
    
}
