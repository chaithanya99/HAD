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

    public Patient getPatientByAbhaAddress(String abhaAddress){
        Patient p=patientRepo.findByAbhaAddress(abhaAddress);
        return p;
    }

    public Optional<Patient> getPatientById(long Id){
        Optional<Patient> p=patientRepo.findById(Id);
        

        return p;
    }

    public String addPatient(Patient p){
        Patient pp=patientRepo.findByAbhaNumber(p.getAbhaNumber());
        if(pp!=null)
        {
            patientRepo.save(p);
            return "patient updated";
        }
        else{
            patientRepo.save(p);
            return "patient added";
        }

    }

    public boolean isPatientPresent(String abhaNumber){
        Patient p=patientRepo.findByAbhaNumber(abhaNumber);
        if(p==null){
            return false;
        }
        return true;
    }

    public Long getId(String abhaNumber){
        Patient p=patientRepo.findByAbhaNumber(abhaNumber);
        if(p==null){
            return (long)-1;
        }
        return p.getId();
    }

    
}
