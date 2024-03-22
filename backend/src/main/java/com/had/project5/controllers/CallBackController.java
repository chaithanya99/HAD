package com.had.project5.controllers;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;
import org.springframework.web.bind.annotation.CrossOrigin;

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

public class CallBackController{
    @CrossOrigin(origins = "*")
    @PostMapping("v0.5/users/auth/fetch-modes")
    public void getreq(@RequestBody Map<String,String> req) {
        System.out.print(req);
    }
}
