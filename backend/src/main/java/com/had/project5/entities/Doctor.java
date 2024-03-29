package com.had.project5.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctor
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String specialization;
    private String name;
    private String abha_id;
    private String email_Id;
    private String mobile;
    private String address;
    private String gender;
    private String YearofBirth;
    private boolean active=true; 
}
