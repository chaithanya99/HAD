package com.had.project5.repositories;

import com.had.project5.entities.GeneralReport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GeneralReportRepo extends JpaRepository<GeneralReport, Long> {
    // You can add custom query methods here if needed

}

