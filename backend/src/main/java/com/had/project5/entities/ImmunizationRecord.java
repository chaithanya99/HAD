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
public class ImmunizationRecord {
    @Id
    private Long id;
    private String type;
    private Date expiry;
    private Long patientId;
    private Long doctorId;
    private String immunization_details;
    private String immunization_recommendation;
}