package com.had.project5.entities.careContextStuff;

import org.bouncycastle.asn1.ocsp.ResponseData;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.had.project5.entities.Resp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnConfirmRes {
    private String requestId;

    private String timestamp;

    private AuthData1 auth;

    private String error;

    private Resp resp;
}
