package com.had.project5.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecord {
    @Id
    @GeneratedValue
    private Long id;
    private String type;
    private Date expiry;
    private Long PatientId;
    private Long DoctorId;
    private String PastHistory;
    private String BodySite;
    private String Severity;
    private String Diagnosis;
    @Lob
    private byte[] pdfData;
}
