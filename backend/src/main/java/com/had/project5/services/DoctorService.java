package com.had.project5.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public Long getMyId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication!=null && authentication.isAuthenticated()){
            String abhaId= authentication.getName();
            Doctor d=doctorRepo.findByAbhaId(abhaId);
            return d.getId();
        }
        else{
            Long id=(long) -1;
            return id;
        }
    }
}
