package com.had.project5.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.project5.entities.healthrecordstuff.Pdf1;

@Repository
public interface PdfRepo extends JpaRepository<Pdf1,Long> {
    List<Pdf1> findByPatientAbhaAddress(String patientAbhaAddress);
}
