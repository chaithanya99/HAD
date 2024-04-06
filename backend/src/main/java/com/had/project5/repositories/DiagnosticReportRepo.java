package com.had.project5.repositories;

import com.had.project5.entities.DiagnosticReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DiagnosticReportRepo extends JpaRepository<DiagnosticReport, Long> {
    // You can add custom query methods here if needed

}

