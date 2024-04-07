package com.had.project5.repositories;

import com.had.project5.entities.healthrecordstuff.ImmunizationRecord;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ImmunizationRecordRepo extends JpaRepository<ImmunizationRecord, Long> {
    // You can add custom query methods here if needed

}

