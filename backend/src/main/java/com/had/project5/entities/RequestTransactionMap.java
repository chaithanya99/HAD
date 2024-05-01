package com.had.project5.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestTransactionMap {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String requestId;
    private String transactionId;
    private String display;
    private Long healthRecordId;
}
