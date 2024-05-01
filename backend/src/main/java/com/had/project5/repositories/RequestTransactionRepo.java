package com.had.project5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.project5.entities.RequestTransactionMap;


@Repository
public interface RequestTransactionRepo extends JpaRepository<RequestTransactionMap,Long>{
    RequestTransactionMap findByRequestId(String requestId);
}
