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
    public ResponseEntity<Map<String, String>> generateOtp(@RequestBody Map<String,String> req) throws Exception{
        try {
            System.out.println("working fine");
            System.out.println(req);
            String encryptedAadhaar;
            encryptedAadhaar = encryption.encryptWithPublicKey(req.get("aadhaar"));
            Map<String,String> payload=new HashMap<>();
            payload.put("aadhaar",encryptedAadhaar);
            String jsonPayload=new ObjectMapper().writeValueAsString(payload);

          String res=apiService.makePostRequest("/v2/registration/aadhaar/generateOtp",jsonPayload);

//            String res=apiService.catfact("https://catfact.ninja/fact");
//            JSONObject jsonResponse= new JSONObject(res);
//            System.out.println(jsonResponse.getString("fact"));
//            Map<String, String> responseMap = new HashMap<>();
//            responseMap.put("message", "Cat fact retrieved successfully");
//            responseMap.put("catFact", jsonResponse.getString("fact"));
//            return ResponseEntity.ok(responseMap);

            JSONObject jsonResponse= new JSONObject(res);
            System.out.println(jsonResponse);
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("txnId", jsonResponse.getString("txnId"));
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        }
    }
    @PostMapping("/verifyAadhaarOTP")
    public ResponseEntity<Map<String, String>> verifyAadhaarOTP(@RequestBody Map<String,String> req) throws Exception{
        try {
            String otp=req.get("otp");
            String txnId=req.get("txnId");
            String encryptedOtp=encryption.encryptWithPublicKey(otp);
            Map<String,String> payload=new HashMap<>();
            payload.put("txnId", txnId);
            payload.put("otp", encryptedOtp);
            String jsonPayload=new ObjectMapper().writeValueAsString(payload);
            String res=apiService.makePostRequest("/v2/registration/aadhaar/verifyOTP",jsonPayload);
            JSONObject jsonResponse= new JSONObject(res);
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("txnId", jsonResponse.getString("txnId"));
            responseMap.put("gender", jsonResponse.getString("gender"));
            responseMap.put("birthdate",jsonResponse.getString("birthdate"));
            responseMap.put("name", jsonResponse.getString("name"));
            // System.out.println(jsonResponse);
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        }
    }

    @PostMapping("/checkAndGenerateMobileOTP")
    public ResponseEntity<Map<String, String>> checkAndGenerateMobileOTP(@RequestBody Map<String,String> req) throws Exception{
        try {
            String txnId=req.get("txnId");
            String mobile=req.get("mobile");
            Map<String,String> payload=new HashMap<>();
            payload.put("txnId", txnId);
            payload.put("mobile", mobile);
            String jsonPayload=new ObjectMapper().writeValueAsString(payload);
            String res=apiService.makePostRequest("/v2/registration/aadhaar/checkAndGenerateMobileOTP",jsonPayload);
            JSONObject jsonResponse= new JSONObject(res);
            // System.out.println(jsonResponse);
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("txnId", jsonResponse.getString("txnId"));
            responseMap.put("mobileLinked",jsonResponse.getString("mobileLinked"));
            return ResponseEntity.ok(responseMap);

        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        }
    }

    @PostMapping("/generateHealthID")
    public void generateHealthID(@RequestBody Map<String,String> req) throws Exception{
        try {
            String txnId=req.get("txnId");
            Map<String,String> payload=new HashMap<>();
            payload.put("txnId", txnId);
            String jsonPayload=new ObjectMapper().writeValueAsString(payload);
            String res=apiService.makePostRequest("/v1/registration/aadhaar/createHealthIdWithPreVerified",jsonPayload);
            JSONObject jsonResponse= new JSONObject(res);
            System.out.println(jsonResponse);
        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        }
    }

    @PostMapping("/verifyToken")
    public void verifyToken(@RequestBody Map<String,String> req){
        String token = req.get("token");
        
        // apiService.isTokenExpired(token);
        jwtService.isTokenExpired(token);
    }
    
}
