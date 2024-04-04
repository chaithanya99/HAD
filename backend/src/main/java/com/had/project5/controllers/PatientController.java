package com.had.project5.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.had.project5.services.PatientService;

@Controller
@RequestMapping("/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;
    @GetMapping("/Id")
    public ResponseEntity<Long> getDoctorId(@RequestBody Map<String,String> req){
        System.out.println(req.get("abhaNumber"));
        Long id=patientService.getId(req.get("abhaNumber"));
        if(id!=(long)-1){
            return ResponseEntity.ok(id);
        }
        else{
            return ResponseEntity.status(400).body((long)-1);
        }
    }
}
