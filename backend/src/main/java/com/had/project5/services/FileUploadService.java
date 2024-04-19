package com.had.project5.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.had.project5.entities.healthrecordstuff.Pdf;
import com.had.project5.repositories.PdfUploadRepo;

@Service
public class FileUploadService {
    @Autowired
    private PdfUploadRepo pdfUploadRepo;

    public String uploadPDF(MultipartFile file,Long doctorId,Long patientId) throws IOException{
        Pdf pdf=new Pdf();
        pdf.setDoctorId(doctorId);
        pdf.setPatientId(patientId);
        pdf.setPdf(file.getBytes());
        pdf.setType(file.getContentType());
        pdf.setName(file.getOriginalFilename());
        pdf=pdfUploadRepo.save(pdf);
        if(pdf!=null){
            return "file uploaded successfully";
        }
        return "file not uploaded";
    }

    public List<Pdf> getPdfsByPatientId(Long patientId){
        return pdfUploadRepo.findByPatientId(patientId);
    }

    public List<Pdf> getPdfsByPatientIdAndDoctorId(Long patientId,Long doctorId){
        return pdfUploadRepo.findByPatientIdAndDoctorId(patientId, doctorId);
    }

}
