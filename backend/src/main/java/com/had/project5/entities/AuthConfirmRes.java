package com.had.project5.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthConfirmRes {
    private String requestId;
    private String otp;
    private String display;
}
