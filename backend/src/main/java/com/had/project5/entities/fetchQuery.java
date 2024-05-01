package com.had.project5.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class fetchQuery {
    private String id;
    private String purpose;
    private fetchRequester requester;
}
