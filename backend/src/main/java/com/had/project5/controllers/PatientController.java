package com.had.project5.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.had.project5.entities.Patient;
import com.had.project5.entities.Worker;
import com.had.project5.repositories.PatientRepo;
import com.had.project5.repositories.WorkerRepo;
import com.had.project5.services.PatientService;

@Controller
@RequestMapping("/patient")
public class PatientController 
{
    @Autowired
    private PatientService patientService;
    @Autowired
    private PatientRepo patientRepo;

    @PostMapping("/Id")
    public ResponseEntity<Long> getPatientId(@RequestBody Map<String,String> req){
        System.out.println(req.get("abhaNumber"));
        Long id=patientService.getId(req.get("abhaNumber"));
        if(id!=(long)-1){
            return ResponseEntity.ok(id);
        }
        else{
            return ResponseEntity.status(400).body((long)-1);
        }
    }

    @GetMapping("/Id")
    public ResponseEntity<Long> getPatientId1(@RequestBody Map<String,String> req){
        System.out.println(req.get("abhaNumber"));
        Long id=patientService.getId(req.get("abhaNumber"));
        if(id!=(long)-1){
            return ResponseEntity.ok(id);
        }
        else{
            return ResponseEntity.status(400).body((long)-1);
        }
    }

    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }
}
