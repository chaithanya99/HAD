package com.had.project5.repositories;

import com.had.project5.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// AppointmentRepository.java
@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorId(Long doctorId);
}
