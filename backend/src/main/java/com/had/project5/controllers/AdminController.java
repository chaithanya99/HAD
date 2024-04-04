package com.had.project5.controllers;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.project5.entities.Doctor;
import com.had.project5.entities.User;
import com.had.project5.entities.Worker;
import com.had.project5.repositories.DoctorRepo;
import com.had.project5.repositories.UserRepo;
import com.had.project5.repositories.WorkerRepo;
import com.had.project5.services.DoctorService;
import com.had.project5.services.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private WorkerRepo workerRepo;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private UserService userService;
    @Autowired
    private DoctorRepo doctorRepo;
    @PostMapping("/dummy")
    public void dummy()
    {
        System.out.println("hemmooo");
    }
    
    @PostMapping("/createdoc")
    public ResponseEntity<String> createDoctor(@RequestBody Doctor doctor) 
    {
        String generatedPassword = generateRandomPassword();
    
        // Set the role for the user entity
        String role = "ROLE_DOCTOR";
        
        // Create a new User entity for the doctor
        User user = new User();
        user.setUsername(doctor.getAbhaId());
        user.setPassword(generatedPassword); // Encode the password
        user.setRoles(role);
        System.out.println(generatedPassword);
        // Save the new User entity
        String s=userService.addUser(user);
        System.out.println(s);
        if("user exists".equals(s)){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User with username " + user.getUsername() + " already exists");
        }
        
        // Save the Doctor entity
        doctorRepo.save(doctor);
        System.out.println("Doctor with id"+user.getUsername()+" has been saved"); 
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor created successfully");
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
    public ResponseEntity<?> markDoctorAsInactive(@RequestBody  Map<String,String> req) {
        // Retrieve the doctor by username
        // @SuppressWarnings("null")
        Doctor doctor = doctorRepo.findByAbhaId(req.get("abhaId"));
        System.out.println(req.get("abhaId"));
        // System.out.println(doctor.get);
        if(doctor==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Doctor not found with ABHAID: " + req.get("abhaId"));
        }
        else{
            System.out.println(doctor.getAbhaId());
        }
        // // Update the active status to false
        doctor.setActive(false);

        // // Save the updated doctor
        doctorRepo.save(doctor);
        return ResponseEntity.ok("Doctor marked as inactive successfully");
    }

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/doctors/{specialization}")
    public List<Doctor> getDoctorsBySpecialization(@PathVariable String specialization) {
        return doctorService.getDoctorsBySpecialization(specialization);
    }

 
// create and delete health worker
// get doctors, patients, healthcare workers

@PostMapping("/createWorker")
    public ResponseEntity<String> createWorker(@RequestBody Worker worker) 
    {
        String generatedPassword = generateRandomPassword();
    
        // Set the role for the user entity
        String role = "ROLE_WORKER";
        
        // Create a new User entity for the doctor
        User user = new User();
        user.setUsername(worker.getAbhaId());
        user.setPassword(generatedPassword); // Encode the password
        user.setRoles(role);
        // System.out.println(generatedPassword);
        // Save the new User entity
        String s=userService.addUser(user);
        System.out.println(s);
        if("user exists".equals(s)){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User with username " + user.getUsername() + " already exists");
        }
        
        // Save the Doctor entity
        // doctorRepo.save(doctor);
        workerRepo.save(worker);
        System.out.println("Worker with id"+user.getUsername()+" has been saved"); 
        return ResponseEntity.status(HttpStatus.CREATED).body("Worker created successfully");
        
    }


@PatchMapping("/deleteWorker")
    public ResponseEntity<?> markWorkerAsInactive(@RequestBody  Map<String,String> req) {
        Worker worker=workerRepo.findByAbhaId(req.get("abhaId"));
        // Doctor doctor = doctorRepo.findByAbhaId(req.get("abhaId"));
        // System.out.println(req.get("abhaId"));
        // System.out.println(doctor.get);
        if(worker==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Worker not found with ABHAID: " + req.get("abhaId"));
        }
        else{
            System.out.println(worker.getAbhaId());
        }
        // // Update the active status to false
        worker.setActive(false);

        // // Save the updated doctor
        workerRepo.save(worker);
        // doctorRepo.save(doctor);
        return ResponseEntity.ok("Worker marked as inactive successfully");
    }


    @GetMapping("/workers")
    public List<Worker> getAllWorkers() {
        return workerRepo.findAll();
    }





}