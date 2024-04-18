package com.had.project5.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.project5.entities.healthrecordstuff.Pdf;

public interface PdfUploadRepo extends JpaRepository<Pdf,Long> {

    List<Pdf> findByPatientIdAndDoctorId(Long patientId,Long doctorId);
    List<Pdf> findByPatientId(Long patientId);
}
