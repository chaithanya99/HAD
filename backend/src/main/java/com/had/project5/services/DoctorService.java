package com.had.project5.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.project5.entities.Doctor;
import com.had.project5.repositories.DoctorRepo;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepo doctorRepo;
    
    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepo.findBySpecialization(specialization);
    }
}
