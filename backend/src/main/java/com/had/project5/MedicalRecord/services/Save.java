package com.had.project5.MedicalRecord.services;

import com.had.project5.MedicalRecord.bean.MedicalRecords;

import java.util.List;

public interface Save {

    String  savePres(MedicalRecords obj);



    List<MedicalRecords> findAllByPatientId(String object);

}
