package com.had.project5.entities.careContextStuff;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthData1 {
    private String accessToken;

    private Validity validity;

    private Patient patient;
}
