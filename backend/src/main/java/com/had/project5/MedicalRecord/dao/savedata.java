package com.had.project5.MedicalRecord.dao;
import com.had.project5.MedicalRecord.bean.MedicalRecords;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface savedata extends JpaRepository<MedicalRecords, Integer> {

//   List<MedicalRecords> findByPatientId(String requestId);

   List<MedicalRecords> findAllByPatientId(String object);

   List<MedicalRecords> findByPatientId(String patientId);
   List<MedicalRecords> findAllByConsentId(String object);


//    MedicalRecords findAll(String patientId);
//
//    MedicalRecords findAllWithPatientIdOnly(String patientId);
}
