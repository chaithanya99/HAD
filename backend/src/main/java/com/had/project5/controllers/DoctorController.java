package com.had.project5.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.had.project5.entities.Doctor;
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

    @GetMapping("/getMyDoctor")
    public ResponseEntity<Doctor> getMyDoctor(){
        Long id=doctorService.getMyId();
        Optional<Doctor> d= doctorService.getDoctorById(id);
        return ResponseEntity.ok().body(d.get());
    }

    @GetMapping("/getDoctor/{id}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable Long id){
        Optional<Doctor> d=doctorService.getDoctorById(id);
        Doctor dd=new Doctor();
        if(!d.isPresent()){
            return ResponseEntity.status(404).body(dd);
        }
        return ResponseEntity.ok().body(d.get());
    }
}
