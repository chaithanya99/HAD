package com.had.project5.repositories;

import com.had.project5.entities.WellnessRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WellnessRecordRepo extends JpaRepository<WellnessRecord, Long> {
    // You can add custom query methods here if needed

}

