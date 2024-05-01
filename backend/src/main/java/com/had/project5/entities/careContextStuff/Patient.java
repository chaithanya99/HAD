package com.had.project5.entities.careContextStuff;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Patient {
    private String id;

    private String name;

 
    private String gender;

   
    private int yearOfBirth;

    
    private int dayOfBirth;

  
    private int monthOfBirth;

    private AddressData address;

    private IdentifierData[] identifiers;
}
