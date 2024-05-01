package com.had.project5.entities.careContextStuff;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthData {
    private String transactionId;
    private String mode;
    private MetaData meta;
}
