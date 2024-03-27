package com.had.project5.entities;
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

public class Patient 
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String Id;
    private String abha_number;
    private String abha_address;
    private String name;
    private String gender;
    private String yearOfBirth;
    private String monthOfBirth;
    private String dayOfBirth;
    private Address address;
}