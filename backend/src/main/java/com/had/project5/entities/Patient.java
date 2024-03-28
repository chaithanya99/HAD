package com.had.project5.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    private String abhaNumber;
    private String abha_address;
    private String name;
    private String gender;
    private String yearOfBirth;
    private String monthOfBirth;
    private String dayOfBirth;
    private String mobile;
    // private Address address;
    private String district;
    private String state;
    // private String pincode;
}