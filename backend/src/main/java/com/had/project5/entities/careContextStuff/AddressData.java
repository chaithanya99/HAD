package com.had.project5.entities.careContextStuff;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressData {
    private String line;
    private String district;
    private String state;
    private String pincode;
}
