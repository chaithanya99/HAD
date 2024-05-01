package com.had.project5.entities.careContextStuff;

import lombok.Data;

@Data
public class Patient1 {
    private String referenceNumber;
    private String display;
    private CareContext[] careContexts;
}
