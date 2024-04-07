package com.had.project5.entities.healthrecordstuff;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Healthrec {
    private String type;
    private Date expiry;
    private Long patientId;
    private Long doctorId;
    private String medicalcondition;
    private String physical_examination;
    private String allergies;
    private String medical_history;
    private String family_history;
    private String medicalprocedure;
    private String medication;
    private String immunization_details;
    private String immunization_recommendation;
    private String diagnosis;
    private String health_report;
    private String heart_rate;
    private String respiratory_rate;
    private String temperature;
    private String blood_pressure;
    private String weight;
    private String height;
    private String general_assessment;
    private String lifestyle;
    private String complaints;
    private String labs_and_imaging;
    private String careplan;


}
