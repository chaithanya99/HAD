package com.had.project5.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.project5.entities.Doctor;

@Repository
public interface DoctorRepo extends JpaRepository<Doctor, Long> {
    // You can add custom query methods here if needed
    Doctor findByAbhaId(String abhaId);
    List<Doctor> findBySpecialization(String specialization);
    Optional<Doctor> findById(Long Id);
}

