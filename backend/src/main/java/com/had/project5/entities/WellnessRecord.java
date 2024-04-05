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
public class WellnessRecord {
    @Id
    private Long id;
    private String type;
    private Date expiry;
    private Long patientId;
    private Long doctorId;
    private String heart_rate;
    private String respiratory_rate;
    private String temperature;
    private String blood_pressure;
    private String weight;
    private String height;
    private String general_assessment;
    private String lifestyle;
}
