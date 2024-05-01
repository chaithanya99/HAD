package com.had.project5.entities.careContextStuff;

import com.had.project5.entities.Resp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthOnInitRes {
    private String requestId;
    private String timestamp;
    private AuthData auth;
    private String error;
    private Resp resp;
}
