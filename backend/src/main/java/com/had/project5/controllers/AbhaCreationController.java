package com.had.project5.controllers;
import javax.crypto.Cipher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.project5.services.ApiService;

@RestController

    
@RequestMapping("/getABHAtoken")
public class AbhaCreationController {
    @Autowired
    private ApiService apiService;

    @GetMapping
    public String getToken(){
        String token=apiService.getToken();

        System.out.println(token);
        return token;
    }
    
}
