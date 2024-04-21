package com.had.project5.repositories.healthrecordrepos;

import com.had.project5.entities.healthrecordstuff.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HealthRecordRepo extends JpaRepository<HealthRecord, Long> {
    // You can add custom query methods here if needed

}

