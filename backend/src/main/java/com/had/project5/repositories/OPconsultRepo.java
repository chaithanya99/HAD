package com.had.project5.repositories;

import com.had.project5.entities.OPconsult;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OPconsultRepo extends JpaRepository<OPconsult, Long> {
    // You can add custom query methods here if needed

}

