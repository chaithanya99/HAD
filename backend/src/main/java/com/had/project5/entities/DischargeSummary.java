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
public class DischargeSummary {
    @Id
    private Long id;
    private String type;
    private Date expiry;
    private Long patientId;
    private Long doctorId;
    private String complaints;
    private String physical_examination;
    private String allergies;
    private String medical_history;
    private String family_history;
    private String labs_and_imaging;
    private String medicalprocedure;
    private String careplan;
    private String medication;
}
