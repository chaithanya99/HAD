package com.had.project5.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Query {
    private String id;
    private String purpose;
    private String authMode;
    private fetchRequester requester;
}
