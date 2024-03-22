package com.had.project5.entities;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Patient {
    private String id;
    private String abha_number;
    private String abha_address;
    private String name;
    private String gender;
    private String yearOfBirth;
    private String monthOfBirth;
    private String dayOfBirth;
    private Address address;
}


// How to set ABHA Address by patient.