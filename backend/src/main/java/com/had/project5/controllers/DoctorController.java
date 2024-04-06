package com.had.project5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.had.project5.services.DoctorService;

@Controller
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;
    @GetMapping("/Id")
    public ResponseEntity<Long> getDoctorId(){
        Long id=doctorService.getMyId();
        if(id!=(long)-1){
            return ResponseEntity.ok(id);
        }
        else{
            return ResponseEntity.status(400).body((long)-1);
        }
    }
}
