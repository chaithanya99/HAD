package com.had.project5.entities;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Address {
    private String line;
    private String district;
    private String state;
    private String pincode;
}
