package com.had.project5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.project5.entities.Worker;

@Repository
public interface WorkerRepo extends JpaRepository<Worker, Long> {
    Worker findByAbhaId(String abhaId);
}
