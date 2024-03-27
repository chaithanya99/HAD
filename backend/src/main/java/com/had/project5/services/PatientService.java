package com.had.project5.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.project5.entities.Patient;
import com.had.project5.repositories.PatientRepo;

@Service
public class PatientService {
    @Autowired
    private PatientRepo patientRepo;

    public String addPatient(Patient p){
        Patient pp=patientRepo.findByAbhaNumber(p.getAbhaNumber());
        if(pp!=null){
            return "patient exists";
        }
        else{
            patientRepo.save(pp);
            return "patient added";
        }

    }
}
