package com.had.project5.repositories;

import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import com.had.project5.entities.Patient;

/**
 * UserRepo
 */
@Repository
public interface PatientRepo extends JpaRepository<Patient,Long>{
    Patient findByAbhaNumber(String abhaNumber);
}
