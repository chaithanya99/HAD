package com.had.project5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.project5.entities.Doctor;

@Repository
public interface DoctorRepo extends JpaRepository<Doctor, Long> {
    // You can add custom query methods here if needed
}

