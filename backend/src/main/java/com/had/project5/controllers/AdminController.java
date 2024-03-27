package com.had.project5.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.project5.entities.Doctor;
import com.had.project5.repositories.DoctorRepo;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private DoctorRepo doctorRepo;
    @PostMapping("/dummy")
    public void dummy()
    {
        System.out.println("hemmooo");
    }
    @PostMapping("/createdoc")
    public Doctor createDoctor(@RequestBody Doctor doctor) 
    {
        return doctorRepo.save(doctor);
    }
    @PatchMapping("/deletedoc")
    public ResponseEntity<?> markDoctorAsInactive(@RequestBody Long Id) {
        // Retrieve the doctor by username
        @SuppressWarnings("null")
        Doctor doctor = doctorRepo.findById(Id)
                .orElseThrow();

        // Update the active status to false
        doctor.setActive(false);

        // Save the updated doctor
        doctorRepo.save(doctor);
        return ResponseEntity.ok("Doctor marked as inactive successfully");
    }
}
 
// create and delete health worker
// get doctors, patients, healthcare workers
