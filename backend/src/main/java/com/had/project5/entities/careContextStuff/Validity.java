package com.had.project5.entities.careContextStuff;

import com.had.project5.entities.fetchRequester;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Validity {
    private fetchRequester requester;
    private String purpose;
    private String expiry;
    private String limit;
}
