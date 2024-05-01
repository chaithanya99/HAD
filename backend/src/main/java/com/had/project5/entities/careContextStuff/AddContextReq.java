package com.had.project5.entities.careContextStuff;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddContextReq {
    private String requestId;
    private String timestamp;
    private Link link;
}
