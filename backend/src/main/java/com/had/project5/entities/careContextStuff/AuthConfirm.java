package com.had.project5.entities.careContextStuff;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthConfirm {
    private String requestId;
    private String timestamp;
    private String transactionId;
    private Cred credential;
}
