package com.had.project5.repositories;

import com.had.project5.entities.healthrecordstuff.DischargeSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DischargeSummaryRepo extends JpaRepository<DischargeSummary, Long> {
    // You can add custom query methods here if needed

}

