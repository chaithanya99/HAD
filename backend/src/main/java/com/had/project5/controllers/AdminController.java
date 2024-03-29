package com.had.project5.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.project5.entities.Doctor;
import com.had.project5.entities.User;
import com.had.project5.repositories.DoctorRepo;
import com.had.project5.repositories.UserRepo;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/dummy")
    public void dummy()
    {
        System.out.println("hemmooo");
    }
    
    @PostMapping("/createdoc")
    public Doctor createDoctor(@RequestBody Doctor doctor) 
    {
        String generatedPassword = generateRandomPassword();
    
        // Set the role for the user entity
        String role = "ROLE_DOCTOR";
        
        // Create a new User entity for the doctor
        User user = new User();
        user.setUsername(doctor.getAbha_id());
        user.setPassword(passwordEncoder.encode(generatedPassword)); // Encode the password
        user.setRoles(role);
        
        // Save the new User entity
        userRepo.save(user);
        
        // Save the Doctor entity
        doctorRepo.save(doctor);
        System.out.println("Doctor with id"+user.getUsername()+" has been saved"); 
        return doctor;
        // Return a response indicating success
        // return ResponseEntity.ok("Doctor created successfully. User credentials: " +
        //                         "Username: " + user.getUsername() + ", " +
        //                         "Password: " + generatedPassword);
    }
    private String generateRandomPassword() {
        // Implement your logic to generate a random password (e.g., using random alphanumeric characters)
        return "randompassword123"; // Placeholder, replace with actual implementation
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
