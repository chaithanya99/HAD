package com.had.project5.controllers;

import com.had.project5.entities.AuthModes;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)

public class CallBackController{
    @PostMapping("v0.5/users/auth/on-fetch-modes")
    public void on_fetch_modes(@RequestBody AuthModes object) {
        try{
            List<String> modes_list = object.getAuth().getModes();
            System.out.print(object.getRequestId());
            System.out.println("\n");
            System.out.println("Available Login modes are: ");
            for(String i : modes_list){
                System.out.println(i);
            }
        }
        catch(Exception e){
            throw new RuntimeException(e);

        }
    }
}
