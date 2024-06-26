package com.had.project5.repositories;

import com.had.project5.entities.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PrescriptionRepo extends JpaRepository<Prescription, Long> {
    // You can add custom query methods here if needed

}

